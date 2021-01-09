import React, { Component } from 'react'
import consts from '../constants'
import config from '../config'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { connect } from 'react-redux'
import { addQuote, deleteQuote, editQuote } from '../actions/quoteActions'
import { ColorExtractor } from 'react-color-extractor'
import defaultImg from '../images/anon.jpg'
import AreYouSureModal from './AreYouSureModal'
import { VaultDiv, Nav, Title, Subtitle, NavReturnBtn, NavEditBtn, QuotesGrid, QuoteContainer,
         NewQuoteContainer, QuoteAuthor, AuthorField, TextArea, QuoteErrorMsg, AddQuoteBtn, QuoteX,
         QuoteBody, QuoteImg, FileInputDiv, FileInput, FileInputBtn, BottomQuoteDiv } from '../styles/InsideVaultStyles'

class Quotes extends Component {
    state = {
        isEditing: false,
        showAreYouSureModal: false,
        quoteToDeleteID: 0,
        newQuote: {body: '', author: '', quoteImg: ''},
        newQuoteEmpty: false,
        emptyErrors: {},
        tempQuotes: {},
        loadingNewImg: false,
        loadingImg: {},
        borderColors: []
    }

    static getDerivedStateFromProps(props, state) {
        if (state.isEditing && Object.keys(state.tempQuotes).length < props.category.quotes.length) {
            let quotes = {...state.tempQuotes}

            const newQuoteID = props.category.quotes[props.category.quotes.length-1]._id
            const newQuote = props.category.quotes[props.category.quotes.length-1]
            quotes[newQuoteID] = newQuote

            return {tempQuotes: quotes}
        } else {
            return null
        }
    }

    addQuote = () => {
        const newQuoteBody = this.state.newQuote.body.trim()
        const newQuoteAuthor = this.state.newQuote.author.trim()
        const newQuoteImg = this.state.newQuote.quoteImg

        if (newQuoteBody.length === 0 || newQuoteAuthor.length === 0) {
            this.setState({newQuoteEmpty: true})
        } else {
            const newQuote = {body: newQuoteBody,
                              author: newQuoteAuthor,
                              quoteImg: newQuoteImg}

            //add to DB; will add to state in getDerived once DB generates id
            this.props.addQuote(newQuote, this.props.categoryID,
                                this.props.vaultID, this.props.userID)
            this.setState({newQuote: {body: '', author: '', quoteImg: ''}})
        }
    }

    deleteQuote = () => {
        const id = this.state.quoteToDeleteID

        //delete from DB
        this.props.deleteQuote(id, this.props.categoryID,
                               this.props.vaultID, this.props.userID)

        //delete from state
        let empty = {...this.state.emptyErrors}
        let quotes = {...this.state.tempQuotes}
        delete empty[id]
        delete quotes[id]
        this.setState({emptyErrors: empty, tempQuotes: quotes})
    }

    validateNewQuoteBodyInput = input => {
        let newQuote = {...this.state.newQuote}

        //check for empty input
        if (input.trim().length === 0) {
            newQuote.body = ''
            this.setState({newQuoteEmpty: true, newQuote: newQuote})
        } else {
            newQuote.body = input
            this.setState({newQuoteEmpty: false, newQuote: newQuote})
        }
    }

    validateNewQuoteAuthorInput = input => {
        let newQuote = {...this.state.newQuote}

        //check for empty input
        if (input.trim().length === 0) {
            newQuote.author = ''
            this.setState({newQuoteEmpty: true, newQuote: newQuote})
        } else {
            newQuote.author = input
            this.setState({newQuoteEmpty: false, newQuote: newQuote})
        }
    }

    validateEditBodyInput = (input, quoteID) => {
        let quotes = {...this.state.tempQuotes}
        let empty = {...this.state.emptyErrors}
        let quote = {body: '',
                     author: quotes[quoteID].author,
                     quoteImg: quotes[quoteID].quoteImg}

        //check for empty input
        if (input.trim().length === 0) {
            quotes[quoteID] = quote
            empty[quoteID] = true
        } else {
            quote.body = input
            quotes[quoteID] = quote
            delete empty[quoteID]
        }

        this.setState({tempQuotes: quotes, emptyErrors: empty})
    }

    validateEditAuthorInput = (input, quoteID) => {
        let quotes = {...this.state.tempQuotes}
        let empty = {...this.state.emptyErrors}
        let quote = {body: quotes[quoteID].body,
                     author: '',
                     quoteImg: quotes[quoteID].quoteImg}

        //check for empty input
        if (input.trim().length === 0) {
            quotes[quoteID] = quote
            empty[quoteID] = true
        } else {
            quote.author = input
            quotes[quoteID] = quote
            delete empty[quoteID]
        }

        this.setState({tempQuotes: quotes, emptyErrors: empty})
    }

    //Uploads image to cloudinary DB and stores generated URL
    uploadNewQuoteImg = async e => {
        const newImg = e.target.files[0]
        let newQuote = {...this.state.newQuote}

        const data = new FormData()
        data.append('file', newImg)
        data.append('upload_preset', consts.IMG_FOLDER)

        this.setState({loadingNewImg: true})

        const res = await fetch(config.uploadImgURL, {method: 'POST', body: data})
        const img = await res.json()

        newQuote.quoteImg = img.secure_url

        this.setState({newQuote: newQuote, loadingNewImg: false})
    }

    //Uploads image to cloudinary DB and stores generated URL
    onUploadImg = async (e, quoteID) => {
        const newImg = e.target.files[0]
        let quotes = {...this.state.tempQuotes}
        let loadingImg = {...this.state.loadingImg}

        const data = new FormData()
        data.append('file', newImg)
        data.append('upload_preset', consts.IMG_FOLDER)

        loadingImg[quoteID] = true
        this.setState({loadingImg: loadingImg})
        
        const res = await fetch(config.uploadImgURL, {method: 'POST', body: data})
        const img = await res.json()

        let quote = {body: quotes[quoteID].body,
                     author: quotes[quoteID].author,
                     quoteImg: img.secure_url}
                     
        quotes[quoteID] = quote
        delete loadingImg[quoteID]

        this.setState({tempQuotes: quotes, loadingImg: loadingImg})
    }

    //Store quotes in state while editing to limit API calls
    startEditing = () => {
        let quotes = {}
        this.props.category.quotes.forEach(quote => quotes[quote._id] = quote)

        this.setState({tempQuotes: quotes, isEditing: true})
    }

    //Update quotes that were changed in DB
    doneEditing = () => {
        this.props.category.quotes.forEach(quote => {
            if (JSON.stringify(quote) !== JSON.stringify(this.state.tempQuotes[quote._id])) {
                this.props.editQuote(quote._id, this.state.tempQuotes[quote._id], 
                                     this.props.categoryID, this.props.vaultID, this.props.userID)
            }
        })

        //reset state
        this.setState({isEditing: false, newQuoteEmpty: false,
                       newQuote: {body: '', author: '', quoteImg: ''},
                       emptyErrors: {}, tempQuotes: {}})
    }

    openAreYouSureModal = () => this.setState({showAreYouSureModal: true})

    closeAreYouSureModal = () => this.setState({showAreYouSureModal: false})

    setQuoteToDeleteID = quoteToDeleteID => this.setState({quoteToDeleteID: quoteToDeleteID})
    
    getBorderColors = colors => {
        if (Math.round(Math.random()) === 0) {
            this.setState({borderColors: [colors[0], colors[colors.length-1]]})
        } else {
            this.setState({borderColors: [colors[colors.length-1], colors[0]]})
        }
    }

    render() {
        const { vaultTitle, category, closeCategory } = this.props

        const { isEditing, showAreYouSureModal, newQuote, newQuoteEmpty, emptyErrors,
                tempQuotes, loadingNewImg, loadingImg, borderColors } = this.state

        const doneIsDisabled = Object.keys(emptyErrors).length > 0
        const quotes = category.quotes

        return (
            <VaultDiv vaultColor1={borderColors[0]} vaultColor2={borderColors[1]}>

                <ColorExtractor src={category.categoryImg} getColors={colors => this.getBorderColors(colors)} />

                <Nav>
                    <NavReturnBtn onClick={closeCategory}>Return to Quote Categories</NavReturnBtn>
                    {!isEditing ?
                        <NavEditBtn onClick={this.startEditing}>
                            Add / Edit / Delete Quotes
                        </NavEditBtn>
                    :   <NavEditBtn isDisabled={doneIsDisabled}
                                    onClick={() => {if (!doneIsDisabled) this.doneEditing()}}>
                            Done Adding / Editing / Deleting Quotes
                        </NavEditBtn>}
                </Nav>

                <CSSTransition in={showAreYouSureModal} timeout={500} classNames='fadeModal' unmountOnExit>
                    <AreYouSureModal closeAreYouSureModal={this.closeAreYouSureModal} 
                                     delete={this.deleteQuote}
                                     areYouSureTxt={consts.ARE_YOU_SURE_QUOTE_TXT}
                                     yesTxt={consts.YES_QUOTE_TXT} />
                </CSSTransition>

                <Title>{vaultTitle} / {category.categoryName}</Title>
                <Subtitle>Quotes</Subtitle>
                
                <TransitionGroup>
                    <QuotesGrid>
                        {isEditing &&
                            <NewQuoteContainer>
                                <TextArea placeholder={'Enter New Quote Without " " Here'}
                                          maxLength={consts.MAX_QUOTE_BODY_LENGTH}
                                          value={newQuote.body}
                                          onChange={e => this.validateNewQuoteBodyInput(e.target.value)} />
                                
                                <AuthorField placeholder={'Enter New Quote Author Here'}
                                             maxLength={consts.MAX_QUOTE_AUTHOR_LENGTH}
                                             value={newQuote.author}
                                             onChange={e => this.validateNewQuoteAuthorInput(e.target.value)} />

                                <QuoteErrorMsg>{newQuoteEmpty ? consts.QUOTE_EMPTY : ''}</QuoteErrorMsg>

                                {!loadingNewImg ?
                                    <QuoteImg isEditing={true}
                                              src={newQuote.quoteImg !== '' ? newQuote.quoteImg : defaultImg} />
                                : <p>Uploading Image...</p>}

                                <br /> <br />

                                <FileInputDiv>
                                    <FileInputBtn>Choose file for quote image</FileInputBtn>
                                    <FileInput type='file'
                                               onChange={e => this.onUploadNewQuoteImg(e)}
                                               accept={'.jpeg, .png, .jpg'} />
                                </FileInputDiv>

                                <br />

                                <AddQuoteBtn isDisabled={newQuoteEmpty}
                                             onClick={() => {if (!newQuoteEmpty) this.addQuote()}}>
                                    Add New Quote
                                </AddQuoteBtn>

                            </NewQuoteContainer>}

                        {quotes.map((quote, i) => (
                            <CSSTransition in={true}
                                           key={quotes[quotes.length-i-1]._id}
                                           timeout={500}
                                           classNames='fadeOnAdd'>

                                    {isEditing ?
                                        <QuoteContainer key={quotes[quotes.length-i-1]._id}>

                                            <QuoteX onClick={() => {
                                                this.openAreYouSureModal()
                                                this.setQuoteToDeleteID(quotes[quotes.length-i-1]._id)}}>
                                                X
                                            </QuoteX>

                                            <TextArea maxLength={consts.MAX_QUOTE_BODY_LENGTH}
                                                      value={tempQuotes[quotes[quotes.length-i-1]._id].body}
                                                      onChange={e => {
                                                          this.validateEditBodyInput(e.target.value, quotes[quotes.length-i-1]._id)
                                                      }} />
                                            
                                            <AuthorField maxLength={consts.MAX_QUOTE_AUTHOR_LENGTH}
                                                         value={tempQuotes[quotes[quotes.length-i-1]._id].author}
                                                         onChange={e => {
                                                             this.validateEditAuthorInput(e.target.value, quotes[quotes.length-i-1]._id)
                                                         }} />

                                            <QuoteErrorMsg>{emptyErrors[quotes[quotes.length-i-1]._id] ? consts.QUOTE_EMPTY : ''}</QuoteErrorMsg>

                                            {!loadingImg[quotes[quotes.length-i-1]._id] ?
                                                <QuoteImg isEditing={true}
                                                          src={tempQuotes[quotes[quotes.length-i-1]._id].quoteImg === '' ? defaultImg
                                                              : tempQuotes[quotes[quotes.length-i-1]._id].quoteImg} />
                                            :   <p>Uploading Image...</p>}

                                            <br /> <br />

                                            <FileInputDiv>
                                                <FileInputBtn>Choose file for quote image</FileInputBtn>
                                                <FileInput type='file'
                                                           onChange={e => this.onUploadImg(e, quotes[quotes.length-i-1]._id)}
                                                           accept={'.jpeg, .png, .jpg'} />
                                            </FileInputDiv>

                                            <br />

                                        </QuoteContainer>

                                    :   <QuoteContainer key={quotes[quotes.length-i-1]._id}>
                                            <QuoteBody>"{quotes[quotes.length-i-1].body}"</QuoteBody>

                                            <BottomQuoteDiv>
                                                <QuoteAuthor>- {quotes[quotes.length-i-1].author}</QuoteAuthor>

                                                <QuoteImg isEditing={false} src={quotes[quotes.length-i-1].quoteImg} />
                                            </BottomQuoteDiv>
                                        </QuoteContainer>}
                            </CSSTransition>
                        ))}
                    </QuotesGrid>
                </TransitionGroup>
            </VaultDiv>
        )
    }
}
  
const mapStateToProps = (state, ownProps) => {
    let vaultIdx = 0, categoryIdx = 0
    for (const vault of state.vaults.vaults) {
        if (vault._id === ownProps.vaultID) {
            for (const category of vault.categories) {
                if (category._id === ownProps.categoryID) break
                categoryIdx++
            }
            break
        }
        vaultIdx++
    }

    return { category: state.vaults.vaults[vaultIdx].categories[categoryIdx] }
}

const mapDispatchToProps = () => {
    return { addQuote, deleteQuote, editQuote }
}

export default connect(mapStateToProps, mapDispatchToProps())(Quotes)