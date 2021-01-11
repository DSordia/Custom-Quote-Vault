import React, { Component } from 'react'
import defaultImg from '../images/blackbox.jpg'
import consts from '../constants'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { connect } from 'react-redux'
import { addCategory, deleteCategory, editCategoryName, editCategoryImg } from '../actions/categoryActions'
import { ColorExtractor } from 'react-color-extractor'
import Quotes from './Quotes'
import AreYouSureModal from './AreYouSureModal'
import { VaultDiv, Nav, Title, Subtitle, NavReturnBtn, NavEditBtn, CategoriesGrid, CategoryContainer,
         NewCategoryContainer, CategoryName, CategoryImg, InputField, CategoryErrorMsg, AddCategoryBtn,
         CategoryX, FileInputDiv, FileInput, FileInputBtn } from '../styles/InsideVaultStyles'
import dotenv from 'dotenv'
dotenv.config()

class QuoteCategories extends Component {
    state = {
        categoryIsOpen: false,
        categoryToOpenID: 0,
        isEditing: false,
        showAreYouSureModal: false,
        categoryToDeleteID: 0,
        categoryToDeleteIdx: 0,
        deleted: false,
        newCategory: {name: '', img: defaultImg},
        newCategoryEmpty: false,
        newCategoryExists: false,
        emptyErrors: {},
        existsErrors: {},
        categoryNames: {},
        categoryImgs: {},
        loadingNewImg: false,
        loadingImg: {},
        borderColors: []
    }

    static getDerivedStateFromProps(props, state) {
        //if there are more categories in the DB than in state, add that category to state
        //unless it's because a category was deleted from state
        if (state.isEditing && Object.keys(state.categoryNames).length < props.vault.categories.length) {
            let categoryNames = {...state.categoryNames}
            let categoryImgs = {...state.categoryImgs}

            const newCategoryID = props.vault.categories[props.vault.categories.length-1]._id
            const newCategoryName = props.vault.categories[props.vault.categories.length-1].categoryName
            const newCategoryImg = props.vault.categories[props.vault.categories.length-1].categoryImg

            if (!state.deleted) {
                categoryNames[newCategoryID] = newCategoryName
                categoryImgs[newCategoryID] = newCategoryImg
            }

            return {categoryNames: categoryNames,
                    categoryImgs: categoryImgs,
                    deleted: false}
        }
        return null
    }

    addCategory = () => {
        const newCategoryName = this.state.newCategory.name.trim()

        if (newCategoryName.length === 0) {
            this.setState({newCategoryEmpty: true})
        } else if (Object.values(this.state.categoryNames).includes(newCategoryName)) {
            this.setState({newCategoryExists: true})
        } else {
            const newCategory = {categoryName: newCategoryName,
                                 categoryImg: this.state.newCategory.img,
                                 quotes: []}
                
            //add to DB; will add to state in getDerived once DB generates id
            this.props.addCategory(newCategory, this.props.vaultID, this.props.userID)
            this.setState({newCategory: {name: '', img: defaultImg}})
        }
    }

    deleteCategory = () => {
        const id = this.state.categoryToDeleteID

        //delete from DB
        this.props.deleteCategory(id, this.props.vaultID, this.props.userID)

        //delete from state
        let empty = {...this.state.emptyErrors}
        let exists = {...this.state.existsErrors}
        let categoryNames = {...this.state.categoryNames}
        let categoryImgs = {...this.state.categoryImgs}

        delete empty[id]
        delete exists[id]
        delete categoryNames[id]
        delete categoryImgs[id]

        this.setState({emptyErrors: empty,
                       existsErrors: exists,
                       categoryNames: categoryNames,
                       categoryImgs: categoryImgs,
                       deleted: true})
    }

    validateNewCategoryInput = input => {
        let categoryNames = {...this.state.categoryNames}
        let newCategory = {...this.state.newCategory}

        //check for empty input
        if (input.trim().length === 0) {
            newCategory.name = ''
            this.setState({newCategory: newCategory,
                           newCategoryEmpty: true,
                           newCategoryExists: false})
        } else {
            newCategory.name = input
            this.setState({newCategory: newCategory,
                           newCategoryEmpty: false})

            //check if input already exists
            if (Object.values(categoryNames).includes(input.trim())) {
                this.setState({newCategoryExists: true})
            } else {
                this.setState({newCategoryExists: false})
            }
        }
    }

    validateEditInput = (input, categoryID) => {
        let categoryNames = {...this.state.categoryNames}
        let emptyErrs = {...this.state.emptyErrors}
        let existsErrs = {...this.state.existsErrors}

        //check for empty input
        if (input.trim().length === 0) {
            categoryNames[categoryID] = ''
            emptyErrs[categoryID] = true
            delete existsErrs[categoryID]
        } else {
            delete emptyErrs[categoryID]

            //check if input already exists
            let exists = false
            for (const id in categoryNames) {
                if (categoryNames[id] === input.trim() && id !== categoryID) {
                    exists = true
                    break
                }
            }
            exists ? existsErrs[categoryID] = true : delete existsErrs[categoryID]
            categoryNames[categoryID] = input
        }

        this.setState({categoryNames: categoryNames,
                       emptyErrors: emptyErrs,
                       existsErrors: existsErrs})
    }

    //Uploads image to cloudinary DB and stores generated URL
    onUploadNewCategoryImg = async e => {
        const newImg = e.target.files[0]
        let newCategory = {...this.state.newCategory}

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

        newCategory.img = img.secure_url

        this.setState({newCategory: newCategory,
                       loadingNewImg: false})
    }

    //Uploads image to cloudinary DB and stores generated URL
    onUploadImg = async (e, categoryID) => {
        const newImg = e.target.files[0]
        let categoryImgs = {...this.state.categoryImgs}
        let loadingImg = {...this.state.loadingImg}

        //make sure file type is correct
        if (!newImg.type.includes('image')){
            alert(consts.INVALID_IMG)
            return
        }

        const data = new FormData()
        data.append('file', newImg)
        data.append('upload_preset', consts.IMG_FOLDER)

        loadingImg[categoryID] = true
        this.setState({loadingImg: loadingImg})

        const res = await fetch(process.env.REACT_APP_UPLOAD_IMG_URL,
                                {method: 'POST', body: data})
        const img = await res.json()

        categoryImgs[categoryID] = img.secure_url
        delete loadingImg[categoryID]

        this.setState({categoryImgs: categoryImgs,
                       loadingImg: loadingImg})
    }


    //Store values that can be edited in state to limit API calls
    startEditing = () => {
        let categoryNames = {}, categoryImgs = {}

        this.props.vault.categories.forEach(category => {
            categoryNames[category._id] = category.categoryName
            categoryImgs[category._id] = category.categoryImg
        })

        this.setState({categoryNames: categoryNames,
                       categoryImgs: categoryImgs,
                       isEditing: true})
    }

    //Update values that were changed in DB
    doneEditing = () => {
        this.props.vault.categories.forEach(category => {
            if (category.categoryName !== this.state.categoryNames[category._id]) {
                this.props.editCategoryName(category._id, this.state.categoryNames[category._id],
                                            this.props.vaultID, this.props.userID)
            }
            if (category.categoryImg !== this.state.categoryImgs[category._id]) {
                this.props.editCategoryImg(category._id, this.state.categoryImgs[category._id],
                                           this.props.vaultID, this.props.userID)
            }
        })

        //reset state
        this.setState({isEditing: false,
                       emptyErrors: {},
                       existsErrors: {},
                       categoryNames: {},
                       categoryImgs: {},
                       newCategoryEmpty: false,
                       newCategoryExists: false,
                       newCategory: {name: '', img: defaultImg}})
    }

    openAreYouSureModal = () => this.setState({showAreYouSureModal: true})
    closeAreYouSureModal = () => this.setState({showAreYouSureModal: false})

    setCategoryToDelete = (categoryToDeleteID, categoryToDeleteIdx) => {
        this.setState({categoryToDeleteID: categoryToDeleteID,
                       categoryToDeleteIdx: categoryToDeleteIdx})
    }

    openCategory = categoryToOpenID => this.setState({categoryIsOpen: true,
                                                      categoryToOpenID: categoryToOpenID})

    closeCategory = () => this.setState({categoryIsOpen: false})

    getBorderColors = colors => {
        if (Math.round(Math.random()) === 0) {
            this.setState({borderColors: [colors[0], colors[colors.length-1]]})
        } else {
            this.setState({borderColors: [colors[colors.length-1], colors[0]]})
        }
    }

    render() {
        const { vault, closeVault, userID } = this.props

        const { categoryIsOpen, categoryToOpenID, isEditing, showAreYouSureModal, newCategory,
                newCategoryEmpty, newCategoryExists, emptyErrors, existsErrors, categoryNames,
                categoryImgs, loadingNewImg, loadingImg, borderColors, categoryToDeleteIdx} = this.state

        const doneIsDisabled = Object.keys(emptyErrors).length > 0 || Object.keys(existsErrors).length > 0
        const addNewDisabled = newCategoryEmpty || newCategoryExists
        const categories = vault.categories

        return (
            <div>
                <ColorExtractor src={vault.vaultImg}
                                getColors={colors => this.getBorderColors(colors)} />

                {!categoryIsOpen ?
                    <VaultDiv vaultColor1={borderColors[0]}
                              vaultColor2={borderColors[1]}>

                        <Nav>
                            <NavReturnBtn onClick={closeVault}>Return to Vaults</NavReturnBtn>
                            {!isEditing ?
                                <NavEditBtn onClick={this.startEditing}>
                                    Add / Edit / Delete Categories
                                </NavEditBtn>
                            :   <NavEditBtn isDisabled={doneIsDisabled}
                                            onClick={() => {if (!doneIsDisabled) this.doneEditing()}}>
                                    Done Adding / Editing / Deleting Categories
                                </NavEditBtn>}
                        </Nav>

                        <Title>{vault.vaultName}</Title>
                        <Subtitle>Quote Categories</Subtitle>
            
                        <TransitionGroup>
                            <CategoriesGrid>
                                {isEditing &&
                                    <NewCategoryContainer>

                                        <InputField placeholder={'Enter Name of New Category Here'}
                                                    maxLength={consts.MAX_CATEGORY_NAME_LENGTH}
                                                    value={newCategory.name}
                                                    onChange={e => this.validateNewCategoryInput(e.target.value)} />

                                        <CategoryErrorMsg isNew={true}>
                                            {newCategoryEmpty ? consts.CATEGORY_EMPTY
                                            : newCategoryExists ? consts.CATEGORY_EXISTS
                                            : ''}
                                        </CategoryErrorMsg>

                                        {!loadingNewImg ?
                                            <CategoryImg isEditing={true}
                                                         src={newCategory.img} />
                                        :   <p>Uploading Image...</p>}

                                        <FileInputDiv>
                                            <FileInputBtn>Choose file for category image</FileInputBtn>
                                            <FileInput type='file'
                                                       onChange={e => this.onUploadNewCategoryImg(e)}
                                                       accept={'.jpeg, .png, .jpg'} />
                                        </FileInputDiv>

                                        <AddCategoryBtn isDisabled={addNewDisabled}
                                                        onClick={() => {if (!addNewDisabled) this.addCategory()}}>
                                            Add New Category
                                        </AddCategoryBtn>

                                    </NewCategoryContainer>}

                                {categories.map((category, i) => (
                                    <CSSTransition in={true}
                                                   key={categories[categories.length-i-1]._id}
                                                   timeout={500}
                                                   classNames='fadeOnAdd'>
                                                       
                                        {isEditing ?
                                            <CategoryContainer key={categories[categories.length-i-1]._id}
                                                               onClick={() => {
                                                                   if (!isEditing) {
                                                                       this.openCategory(categories[categories.length-i-1]._id)
                                                                   }
                                                                }}
                                                               isEditing={true}>

                                                <CSSTransition in={showAreYouSureModal && i === categoryToDeleteIdx}
                                                               timeout={500}
                                                               classNames='fadeModal'
                                                               unmountOnExit>
                                                    <AreYouSureModal closeAreYouSureModal={this.closeAreYouSureModal}
                                                                     delete={this.deleteCategory}
                                                                     areYouSureTxt={consts.ARE_YOU_SURE_CATEGORY_TXT}
                                                                     yesTxt={consts.YES_CATEGORY_TXT} />
                                                </CSSTransition>

                                                <CategoryX onClick={() => {
                                                                this.openAreYouSureModal()
                                                                this.setCategoryToDelete(categories[categories.length-i-1]._id, i)
                                                           }}>
                                                    X
                                                </CategoryX>

                                                <InputField maxLength={consts.MAX_CATEGORY_NAME_LENGTH}
                                                            value={categoryNames[categories[categories.length-i-1]._id] || ''}
                                                            onChange={e => {
                                                                this.validateEditInput(e.target.value,
                                                                                       categories[categories.length-i-1]._id)
                                                            }} />

                                                <CategoryErrorMsg isNew={false}>
                                                    {emptyErrors[categories[categories.length-i-1]._id] ? consts.CATEGORY_EMPTY
                                                    : existsErrors[categories[categories.length-i-1]._id] ? consts.CATEGORY_EXISTS
                                                    : ''}
                                                </CategoryErrorMsg>

                                                {!loadingImg[categories[categories.length-i-1]._id] ?
                                                    <CategoryImg isEditing={true}
                                                                 src={categoryImgs[categories[categories.length-i-1]._id]} />
                                                :   <p>Uploading Image...</p>}

                                                <FileInputDiv>
                                                    <FileInputBtn>Choose file for category image</FileInputBtn>

                                                    <FileInput type='file'
                                                               onChange={e => {
                                                                   this.onUploadImg(e, categories[categories.length-i-1]._id)
                                                               }}
                                                               accept={'.jpeg, .png, .jpg'} />
                                                </FileInputDiv>

                                            </CategoryContainer>

                                        :   <CategoryContainer key={categories[categories.length-i-1]._id}
                                                               onClick={() => {
                                                                   if (!isEditing) {
                                                                       this.openCategory(categories[categories.length-i-1]._id)
                                                                    }
                                                                }}
                                                               isEditing={false}>   

                                                <CategoryName>{categories[categories.length-i-1].categoryName}</CategoryName>

                                                <CategoryImg isEditing={false}
                                                             src={categories[categories.length-i-1].categoryImg} />

                                            </CategoryContainer>}
                                    </CSSTransition>
                                ))}
                            </CategoriesGrid>
                        </TransitionGroup>
                    </VaultDiv>
                    
                :   <Quotes userID={userID}
                            categoryID={categoryToOpenID}
                            vaultID={vault._id}
                            vaultTitle={vault.vaultName}
                            closeCategory={this.closeCategory} />}
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    let i = 0
    for (const vault of state.vaults.vaults) {
        if (vault._id === ownProps.vaultID) break
        i++
    }
    
    return { vault: state.vaults.vaults[i] }
}

const mapDispatchToProps = () => {
    return { addCategory, deleteCategory, editCategoryName, editCategoryImg }
}

export default connect(mapStateToProps, mapDispatchToProps())(QuoteCategories)