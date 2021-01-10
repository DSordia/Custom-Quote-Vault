import React, { Component } from 'react'
import defaultImg from '../images/vaultPic.jpg'
import consts from '../constants'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { connect } from 'react-redux'
import { addVault, deleteVault, editVaultName, editVaultImg } from '../actions/vaultActions'
import Vault from './Vault'
import AreYouSureModal from './AreYouSureModal'
import { VaultsNav, VaultsNavEditBtn, VaultsGrid, NewVaultContainer, InputField, VaultErrorMsg, VaultImg,
         AddVaultBtn, VaultContainer, VaultX, VaultTxt, LoginTxt, FileInputDiv, FileInput, FileInputBtn } from '../styles/VaultsStyles'
import dotenv from 'dotenv'
dotenv.config()

class Vaults extends Component {
    state = {
        vaultIsOpen: false,
        vaultToOpenID: {},
        isEditing: false,
        showAreYouSureModal: false,
        vaultToDeleteID: 0,
        deleted: false,
        newVault: {name: '', img: defaultImg},
        newVaultEmpty: false,
        newVaultExists: false,
        emptyErrors: {},
        existsErrors: {},
        vaultNames: {},
        vaultImgs: {},
        loadingNewImg: false,
        loadingImg: {}
    }

    static getDerivedStateFromProps(props, state) {
        // if there are more vaults in the DB than in state, add that vault to state
        // unless it's because a vault was deleted from state
        if (state.isEditing && (Object.keys(state.vaultNames).length < props.vaults.vaults.length)) {
            let vaultNames = {...state.vaultNames}
            let vaultImgs = {...state.vaultImgs}

            const newVaultID = props.vaults.vaults[props.vaults.vaults.length-1]._id
            const newVaultName = props.vaults.vaults[props.vaults.vaults.length-1].vaultName
            const newVaultImg = props.vaults.vaults[props.vaults.vaults.length-1].vaultImg

            if (!state.deleted) {
                vaultNames[newVaultID] = newVaultName
                vaultImgs[newVaultID] = newVaultImg
            }

            return {vaultNames: vaultNames,
                    vaultImgs: vaultImgs,
                    deleted: false}
        } else {
            return null
        }
    }

    addVault = () => {
        const newVaultName = this.state.newVault.name.trim()

        if (newVaultName.length === 0) {
            this.setState({newVaultEmpty: true})
        } else if (Object.values(this.state.vaultNames).includes(newVaultName)) {
            this.setState({newVaultExists: true})
        } else {
            const newVault = {vaultName: newVaultName,
                              vaultImg: this.state.newVault.img,
                              categories: []}

            //add to DB; will add to state in getDerived once DB generates id
            this.props.addVault(newVault, this.props.userID)
            this.setState({newVault: {name: '', img: defaultImg}})
        }
    }

    deleteVault = () => {
        const id = this.state.vaultToDeleteID

        //delete from DB
        this.props.deleteVault(id, this.props.userID)

        //delete from state
        let empty = {...this.state.emptyErrors}
        let exists = {...this.state.existsErrors}
        let vaultNames = {...this.state.vaultNames}
        let vaultImgs = {...this.state.vaultImgs}

        delete empty[id]
        delete exists[id]
        delete vaultNames[id]
        delete vaultImgs[id]

        this.setState({emptyErrors: empty,
                       existsErrors: exists,
                       vaultNames: vaultNames,
                       vaultImgs: vaultImgs,
                       deleted: true})
    }

    validateNewVaultInput = input => {
        let vaultNames = {...this.state.vaultNames}
        let newVault = {...this.state.newVault}

        //check for empty input
        if (input.trim().length === 0) {
            newVault.name = ''
            this.setState({newVault: newVault,
                           newVaultEmpty: true,
                           newVaultExists: false})
        } else {
            newVault.name = input
            this.setState({newVault: newVault,
                           newVaultEmpty: false})

            //check if input already exists
            if (Object.values(vaultNames).includes(input.trim())) {
                this.setState({newVaultExists: true})
            } else {
                this.setState({newVaultExists: false})
            }
        }
    }

    validateEditInput = (input, vaultID) => {
        let vaultNames = {...this.state.vaultNames}
        let emptyErrs = {...this.state.emptyErrors}
        let existsErrs = {...this.state.existsErrors}

        //check for empty input
        if (input.trim().length === 0) {
            vaultNames[vaultID] = ''
            emptyErrs[vaultID] = true
            delete existsErrs[vaultID]
        } else {
            delete emptyErrs[vaultID]

            //check if input already exists
            let exists = false
            for (const id in vaultNames) {
                if (vaultNames[id] === input.trim() && id !== vaultID) {
                    exists = true
                    break
                }
            }
            exists ? existsErrs[vaultID] = true : delete existsErrs[vaultID]
            vaultNames[vaultID] = input
        }

        this.setState({vaultNames: vaultNames,
                       emptyErrors: emptyErrs,
                       existsErrors: existsErrs})
    }

    //Uploads image to cloudinary DB and stores generated URL
    onUploadNewVaultImg = async e => {
        const newImg = e.target.files[0]
        let newVault = {...this.state.newVault}

        //make sure file type is correct
        if (!newImg.type.includes('image')){
            alert(consts.INVALID_IMG)
            return
        }

        const data = new FormData()
        data.append('file', newImg)
        data.append('upload_preset', consts.IMG_FOLDER)

        this.setState({loadingNewImg: true})

        const res = await fetch(process.env.REACT_APP_UPLOAD_IMG_URL,
                                {method: 'POST', body: data})
        const img = await res.json()

        newVault.img = img.secure_url

        this.setState({newVault: newVault, loadingNewImg: false})
    }

    //Uploads image to cloudinary DB and stores generated URL
    onUploadImg = async (e, vaultID) => {
        const newImg = e.target.files[0]
        let vaultImgs = {...this.state.vaultImgs}
        let loadingImg = {...this.state.loadingImg}

        //make sure file type is correct
        if (!newImg.type.includes('image')){
            alert(consts.INVALID_IMG)
            return
        }

        const data = new FormData()
        data.append('file', newImg)
        data.append('upload_preset', consts.IMG_FOLDER)

        loadingImg[vaultID] = true
        this.setState({loadingImg: loadingImg})

        const res = await fetch(process.env.REACT_APP_UPLOAD_IMG_URL,
                                {method: 'POST', body: data})
        const img = await res.json()

        vaultImgs[vaultID] = img.secure_url
        delete loadingImg[vaultID]

        this.setState({vaultImgs: vaultImgs,
                       loadingImg: loadingImg})
    }

    //Store values that can be edited in state to limit API calls
    startEditing = () => {
        let vaultNames = {}, vaultImgs = {}

        this.props.vaults.vaults.forEach(vault => {
            vaultNames[vault._id] = vault.vaultName
            vaultImgs[vault._id] = vault.vaultImg
        })

        this.setState({vaultNames: vaultNames,
                       vaultImgs: vaultImgs,
                       isEditing: true})
    }

    //Update values that were changed in DB
    doneEditing = () => {
        this.props.vaults.vaults.forEach(vault => {
            if (vault.vaultName !== this.state.vaultNames[vault._id]) {
                this.props.editVaultName(vault._id, this.state.vaultNames[vault._id],
                                         this.props.userID)
            }
            if (vault.vaultImg !== this.state.vaultImgs[vault._id]) {
                this.props.editVaultImg(vault._id, this.state.vaultImgs[vault._id],
                                        this.props.userID)
            }
        })

        //reset state
        this.setState({isEditing: false,
                       emptyErrors: {},
                       existsErrors: {},
                       vaultNames: {},
                       vaultImgs: {},
                       newVaultEmpty: false,
                       newVaultExists: false,
                       newVault: {name: '', img: defaultImg}})
    }

    openAreYouSureModal = () => this.setState({showAreYouSureModal: true})

    closeAreYouSureModal = () => this.setState({showAreYouSureModal: false})

    setVaultToDeleteID = vaultToDeleteID => this.setState({vaultToDeleteID: vaultToDeleteID})

    openVault = vaultToOpenID => {
        this.setState({vaultIsOpen: true, vaultToOpenID: vaultToOpenID})
        this.props.openVault()
    }

    closeVault = () => this.setState({vaultIsOpen: false})

    render() {
        const { openLoginSignupModal, shouldCloseVault, isLoggedIn, userID, loading } = this.props

        const { vaultIsOpen, vaultToOpenID, isEditing, showAreYouSureModal, newVault,
                newVaultEmpty, newVaultExists, emptyErrors, existsErrors, vaultNames,
                vaultImgs, loadingNewImg, loadingImg } = this.state

        const doneIsDisabled = Object.keys(emptyErrors).length > 0 || Object.keys(existsErrors).length > 0
        const addNewDisabled = newVaultEmpty || newVaultExists
        const vaults = this.props.vaults.vaults

        return (
            <div>
                {isLoggedIn && (!vaultIsOpen || shouldCloseVault) ?
                    <>
                        <VaultsNav>
                            {!isEditing ?
                                <VaultsNavEditBtn onClick={this.startEditing}>
                                    Add / Edit / Delete Vaults
                                </VaultsNavEditBtn>
                            :   <VaultsNavEditBtn isDisabled={doneIsDisabled}
                                                  onClick={() => {if (!doneIsDisabled) this.doneEditing()}}>
                                    Done Adding / Editing / Deleting Vaults
                                </VaultsNavEditBtn>}
                        </VaultsNav>
    
                        <CSSTransition in={showAreYouSureModal} timeout={500} classNames='fadeModal' unmountOnExit>
                            <AreYouSureModal closeAreYouSureModal={this.closeAreYouSureModal}
                                             delete={this.deleteVault}
                                             areYouSureTxt={consts.ARE_YOU_SURE_VAULT_TXT}
                                             yesTxt={consts.YES_VAULT_TXT} />
                        </CSSTransition>
    
                        <TransitionGroup>
                            <VaultsGrid>
                                {loading &&
                                    <VaultContainer>
                                        <VaultTxt>Loading Vaults...</VaultTxt>
                                        <VaultImg src={defaultImg} />
                                    </VaultContainer>}

                                {isEditing &&
                                    <NewVaultContainer>

                                        <InputField placeholder={'Enter Name of New Vault Here'}
                                                    maxLength={consts.MAX_VAULT_NAME_LENGTH}
                                                    value={newVault.name}
                                                    onChange={e => this.validateNewVaultInput(e.target.value)} />

                                        <VaultErrorMsg isNewVaultName={true}>
                                            {newVaultEmpty ? consts.VAULT_EMPTY
                                            : newVaultExists ? consts.VAULT_EXISTS
                                            : ''}
                                        </VaultErrorMsg>
                                        
                                        {!loadingNewImg ? <VaultImg isEditing={true} src={newVault.img} />
                                        : <p>Uploading Image...</p>}

                                        <FileInputDiv>
                                            <FileInputBtn>Choose file for vault image</FileInputBtn>
                                            <FileInput type='file'
                                                       onChange={e => this.onUploadNewVaultImg(e)}
                                                       accept={'.jpeg, .png, .jpg'} />
                                        </FileInputDiv>

                                        <AddVaultBtn isDisabled={addNewDisabled}
                                                     onClick={() => {if (!addNewDisabled) this.addVault()}}>
                                            Add New Vault
                                        </AddVaultBtn>

                                    </NewVaultContainer>}

                                {vaults.map((vault, i) => (
                                    <CSSTransition in={true} key={vaults[vaults.length-i-1]._id} timeout={500} classNames='fadeOnAdd'>
                                        {isEditing ?
                                            <VaultContainer key={vaults[vaults.length-i-1]._id}
                                                            onClick={() => {if (!isEditing) {
                                                                this.openVault(vaults[vaults.length-i-1]._id)
                                                            }}}
                                                            isEditing={true}>

                                                <VaultX onClick={() => {
                                                            this.openAreYouSureModal()
                                                            this.setVaultToDeleteID(vaults[vaults.length-i-1]._id)
                                                        }}>
                                                    X
                                                </VaultX>

                                                <InputField maxLength={consts.MAX_VAULT_NAME_LENGTH}
                                                            value={vaultNames[vaults[vaults.length-i-1]._id]}
                                                            onChange={e => {
                                                                this.validateEditInput(e.target.value, vaults[vaults.length-i-1]._id)
                                                            }} />

                                                <VaultErrorMsg isNewVaultName={false}>
                                                    {emptyErrors[vaults[vaults.length-i-1]._id] ? consts.VAULT_EMPTY
                                                    : existsErrors[vaults[vaults.length-i-1]._id] ? consts.VAULT_EXISTS
                                                    : ''}
                                                </VaultErrorMsg>
                                                
                                                {!loadingImg[vaults[vaults.length-i-1]._id] ?
                                                    <VaultImg isEditing={true}
                                                              src={vaultImgs[vaults[vaults.length-i-1]._id]} />
                                                : <p>Uploading Image...</p>}

                                                <FileInputDiv>
                                                    <FileInputBtn>Choose file for vault image</FileInputBtn>
                                                    <FileInput type='file'
                                                               onChange={e => this.onUploadImg(e, vaults[vaults.length-i-1]._id)}
                                                               accept={'.jpeg, .png, .jpg'} />
                                                </FileInputDiv>

                                            </VaultContainer>

                                        :   <VaultContainer key={vaults[vaults.length-i-1]._id}
                                                            onClick={() => {if (!isEditing) {
                                                                this.openVault(vaults[vaults.length-i-1]._id)
                                                            }}}
                                                            isEditing={false}>

                                                <VaultTxt>{vaults[vaults.length-i-1].vaultName}</VaultTxt>

                                                <VaultImg isEditing={false} src={vaults[vaults.length-i-1].vaultImg} />
                                            </VaultContainer>}
                                    </CSSTransition>
                                ))}
                            </VaultsGrid>
                        </TransitionGroup>
                    </>

                : isLoggedIn && vaultIsOpen ? <Vault userID={userID}
                                                     vaultID={vaultToOpenID}
                                                     closeVault={this.closeVault} />

                : <VaultsGrid>
                    <VaultContainer onClick={openLoginSignupModal}>
                        <LoginTxt>Log In or Sign Up to view or create quote vaults.</LoginTxt>
                        <VaultImg src={defaultImg} />
                    </VaultContainer>
                  </VaultsGrid>}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { vaults: state.vaults,
             isLoggedIn: state.user.isLoggedIn,
             loading: state.vaults.loading }
}

const mapDispatchToProps = () => {
    return { addVault, deleteVault, editVaultName, editVaultImg }
}

export default connect(mapStateToProps, mapDispatchToProps())(Vaults)