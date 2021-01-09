import styled from 'styled-components'
import 'typeface-roboto'

export const VaultDiv = styled.div`
    border: 17px solid transparent;
    -moz-border-image: -moz-linear-gradient(top, ${props => props.vaultColor1} 0%, ${props => props.vaultColor2} 100%);
    -webkit-border-image: -webkit-linear-gradient(top, ${props => props.vaultColor1} 0%, ${props => props.vaultColor2} 100%);
    border-image: linear-gradient(to bottom right, ${props => props.vaultColor1} 0%, ${props => props.vaultColor2} 100%);
    border-image-slice: 1;
    min-height: 100vh;
    margin-top: 45px;
    color: white;
`
export const Nav = styled.nav`
    display: flex;
    justify-content: space-between;
`
export const Title = styled.p`
    @media (max-width: 480px) { margin-top: 3.5%; font-size: 1.6rem;  }
    @media (min-width: 480px) and (max-width: 768px) { margin-top: 2%; font-size: 1.7rem; }
    @media (min-width: 768px) and (max-width: 1200px) { margin-top: 0%; font-size: 1.8rem; }
    @media (min-width: 1200px) { margin-top: 0%; font-size: 1.9rem; }
`
export const NavReturnBtn = styled.a`
    border: 2px solid #120737;
    color: #bfbfbf;
    padding: 7px 9px;
    margin-left: 1.5%;
    margin-right: 5%:
    font-size: 0.9rem;
    cursor: pointer;
    text-decoration: none;
    margin-top: 1%;
    height: 5%;
    transition: .35s;
    :hover {
        color: white;
        border: 2px solid #1e0b59;
    }
`
export const NavEditBtn = styled.a`
    border: 2px solid #120737;
    color: #bfbfbf;
    margin-left: 5%;
    padding: 7px 9px;
    margin-right: 1.5%;
    font-size: 0.9rem;
    cursor: ${props => props.isDisabled ? 'not-allowed' : 'pointer'};
    text-decoration: none;
    margin-top: 1%;
    height: 5%;
    transition: .35s;
    :hover {
        color: ${props => props.isDisabled ? '#bfbfbf' : 'white'};
        border: ${props => props.isDisabled ? '2px solid #120737' : '2px solid #1e0b59'};
    }
`
export const Subtitle = styled.p`
    margin-top: -0.5%;
    font-size: 1.1rem;
    @media (min-width: 1200px) { font-size: 1.3rem; }
`
export const CategoriesGrid = styled.div`
    display: flex;
    justify-content: space-evenly;
    width: 90%;
    flex-wrap: wrap;
    margin: 1% auto;
`
export const QuotesGrid = styled.div`
    width: 90%;
    margin: 1% auto;
    column-count: auto;
    @media (max-width: 768px) { column-width: 70vw; }
    @media (min-width: 768px) { column-width: 45vw; }
`
export const CategoryContainer = styled.div`
    border: 6px solid #120737;
    margin: 2%;
    color: #c9c9c9;
    display: flex;
    cursor: ${props => props.isEditing ? 'default' : 'pointer'};
    transition: .35s;
    flex-direction: column;
    justify-content: ${props => props.isEditing ? 'space-evenly' : 'start'};
    align-items: center;
    :hover {
        color: white;
        border: ${props => props.isEditing ? '6px solid #120737' : '6px solid #1e0b59;'};
    }
    @media (max-width: 480px) { width: 90vw; height: 80vw; }
    @media (min-width: 480px) and (max-width: 768px) { width: 60vw; height: 54vw; }
    @media (min-width: 768px) and (max-width: 1200px) { width: 38vw; height: 33vw; }
    @media (min-width: 1200px) { width: 28vw; height: 22vw; }
`
export const NewCategoryContainer = styled.div`
    border: 6px solid #120737;
    margin: 2%;
    color: #c9c9c9;
    display: flex;
    transition: .35s;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    @media (max-width: 480px) { width: 90vw; height: 80vw; }
    @media (min-width: 480px) and (max-width: 768px) { width: 60vw; height: 54vw; }
    @media (min-width: 768px) and (max-width: 1200px) { width: 38vw; height: 33vw; }
    @media (min-width: 1200px) { width: 28vw; height: 22vw; }
`
export const InputField = styled.input`
    width: 87%;
    padding: 7px 9px;
    margin-top: -4%;
    border: 2px solid #120737;
    font-size: 1.15rem;
    background-color: black;
    text-align: center;
    color: #c9c9c9;
    :focus {
        outline: none;
        box-shadow: none;
        border: 2px solid #1e0b59;
    }
    ::placeholder {
        color: white;
        opacity: 0.5;
        text-align: center;
    }
    @media (max-width: 351px) { font-size: 0.8rem; }
`
export const FileInputDiv = styled.div`
    display: inline-block;
    position: relative;
    overflow: hidden;
    margin-top: -5%;
`
export const FileInput = styled.input`
    left: 0;
    top: 0;
    opacity: 0;
    position: absolute;
    font-size: 0.9rem;
    ::-webkit-file-upload-button {
        cursor: pointer;
    }
    :hover {
        cursor: pointer;
    }
`
export const FileInputBtn = styled.button`
    border: none;
    background-color: black;
    border: 2px solid #120737;
    color: #bfbfbf;
    padding: 3px 8px;
    font-size: 0.85rem;
    outline: none;
    text-decoration: none;
    :hover {
        cursor: pointer;
    }
`
export const AddCategoryBtn = styled.button`
    border: 2px solid #120737;
    background-color: black;
    color: #bfbfbf;
    padding: 7px 9px;
    font-size: 0.9rem;
    margin-top: -3%;
    margin-bottom: -6%;
    outline: none;
    cursor: ${props => props.isDisabled ? 'not-allowed' : 'pointer'};
    text-decoration: none;
    transition: .35s;
    :hover {
        color: ${props => props.isDisabled ? '#bfbfbf' : 'white'};
        border: ${props => props.isDisabled ? '2px solid #120737' : '2px solid #1e0b59'};
    }
`
export const CategoryX = styled.a`
    color: #500000;
    font-size: 1.9rem;
    font-weight: 600;
    text-decoration: none;
    align-self: flex-end;
    transform: scaleX(1.1) scaleY(0.9);
    margin-right: 2%;
    margin-top: -6%;
    cursor: pointer;
    transition: .35s;
    :hover {
        color: #8b0000;
    }
`
export const QuoteX = styled.a`
    color: #500000;
    font-size: 1.9rem;
    font-weight: 600;
    text-decoration: none;
    transform: scaleX(1.1) scaleY(0.9);
    cursor: pointer;
    margin-left: 95%;
    margin-right: -6%;
    margin-bottom: 100px;
    transition: .35s;
    :hover {
        color: #8b0000;
    }
`
export const CategoryErrorMsg = styled.p`
    margin-top: ${props => props.isNew ? '-6%' : '-4%'};
    font-size: 0.9rem;
    margin-bottom: ${props => props.isNew ? '-6%' : '-3%'};
    color: #8b0000;
    @media (max-width: 351px) { font-size: 0.8rem; }
`
export const QuoteErrorMsg = styled.p`
    margin-top: -3%;
    font-size: 0.9rem;
    color: #8b0000;
    @media (max-width: 351px) { font-size: 0.8rem; }
`
export const QuoteContainer = styled.div`
    border: 6px solid #120737;
    margin: 5%;
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 10px;
    min-width: 30%;
    padding-top: 5px;
    color: #c9c9c9;
    display: inline-block;
`
export const QuoteBody = styled.p`
    word-break: break-word;
    margin-bottom: 8%;
`
export const NewQuoteContainer = styled.div`
    border: 6px solid #120737;
    margin: 5%;
    padding: 20px;
    color: #c9c9c9;
    display: inline-block;
`
export const TextArea = styled.textarea`
    width: 85%;
    padding: 7px 9px;
    border: 2px solid #120737;
    font-size: 1rem;
    background-color: black;
    text-align: center;
    word-break: break-word;
    resize: none;
    overflow: visible;
    font-family: 'Roboto';
    color: #c9c9c9;
    min-height: 100px;
    :focus {
        outline: none;
        box-shadow: none;
        border: 2px solid #1e0b59;
    }
    ::placeholder {
        color: white;
        opacity: 0.5;
        text-align: center;
    }
    @media (max-width: 351px) { font-size: 0.8rem; }
`
export const AuthorField = styled.input`
    width: 85%;
    padding: 6px 8px;
    border: 2px solid #120737;
    font-size: 0.9rem;
    background-color: black;
    text-align: center;
    margin-top: 5%;
    margin-bottom: 5%;
    color: #c9c9c9;
    :focus {
        outline: none;
        box-shadow: none;
        border: 2px solid #1e0b59;
    }
    ::placeholder {
        color: white;
        opacity: 0.5;
        text-align: center;
    }
    @media (max-width: 351px) { font-size: 0.8rem; }
`
export const AddQuoteBtn = styled.button`
    border: 2px solid #120737;
    background-color: black;
    color: #bfbfbf;
    padding: 7px 9px;
    font-size: 0.9rem;
    margin-top: 8%;
    margin-bottom: -4%;
    outline: none;
    cursor: ${props => props.isDisabled ? 'not-allowed' : 'pointer'};
    text-decoration: none;
    transition: .35s;
    :hover {
        color: ${props => props.isDisabled ? '#bfbfbf' : 'white'};
        border: ${props => props.isDisabled ? '2px solid #120737' : '2px solid #1e0b59'};
    }
`
export const CategoryName = styled.div`
    width: 85%;
    font-size: 1.2rem;
    margin-top: 5%;
    @media (min-width: 1200px) { font-size: 1.25rem; }
`
export const CategoryImg = styled.img`
    max-width: 80%;
    max-height: ${props => props.isEditing ? '45%' : '60%'};
    position: relative;
    top: ${props => !props.isEditing && '40%'};
    transform: ${props => !props.isEditing && 'translateY(-50%)'};
    -webkit-transform: ${props => !props.isEditing && 'translateY(-50%)'};
`
export const BottomQuoteDiv = styled.div`
    display: flex;
`
export const QuoteImg = styled.img`
    max-width: ${props => props.isEditing ? '25%' : '30%'};
    max-height: ${props => props.isEditing ? '100px' : '90px'};
    margin-left: ${props => !props.isEditing && '10%'};
    float: ${props => !props.isEditing && 'right'};
`
export const QuoteAuthor = styled.span`
    text-align: left;
    float: left;
    font-style: italic;
    width: 70%;
    word-break: break-word;
    padding-top: 20px;
`