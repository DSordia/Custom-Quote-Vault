import styled from 'styled-components'

export const VaultsNav = styled.nav`
    display: flex;
    justify-content: flex-end;
    margin-top: 45px;
    margin-bottom: -5%;
`
export const VaultsNavEditBtn = styled.a`
    border: 2px solid #120737;
    color: #bfbfbf;
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
export const VaultsGrid = styled.div`
    display: flex;
    justify-content: space-evenly;
    width: 90%;
    flex-wrap: wrap;
    @media (max-width: 480px) { margin: 20% auto; }
    @media (min-width: 480px) and (max-width: 768px) { margin: 10% auto; }
    @media (min-width: 768px) and (max-width: 992px) { margin: 7% auto; }
    @media (min-width: 992px) { margin: 5% auto; }
`
export const VaultContainer = styled.div`
    border: 8px solid #120737;
    margin: 2%;
    color: #c9c9c9;
    display: flex;
    cursor: ${props => props.isEditing ? 'default' : 'pointer'};
    flex-direction: column;
    justify-content: ${props => props.isEditing ? 'space-evenly' : 'start'};
    align-items: center;
    transition: .35s;
    :hover {
        color: white;
        border: ${props => props.isEditing ? '8px solid #120737' : '8px solid #1e0b59;'};
    }
    @media (max-width: 480px) { width: 90vw; height: 90vw; }
    @media (min-width: 480px) and (max-width: 768px) { width: 60vw; height: 60vw; }
    @media (min-width: 768px) and (max-width: 1200px) { width: 38vw; height: 38vw; }
    @media (min-width: 1200px) { width: 25vw; height: 25vw; }
`
export const NewVaultContainer = styled.div`
    border: 8px solid #120737;
    margin: 2%;
    color: #c9c9c9;
    display: flex;
    transition: .35s;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    @media (max-width: 480px) { width: 90vw; height: 90vw; }
    @media (min-width: 480px) and (max-width: 768px) { width: 60vw; height: 60vw; }
    @media (min-width: 768px) and (max-width: 1200px) { width: 38vw; height: 38vw; }
    @media (min-width: 1200px) { width: 25vw; height: 25vw; }
`
export const VaultTxt = styled.p`
    width: 87%;
    padding: 7px 9px;
    margin-top: 7%;
    word-wrap: break-word;
    @media (max-width: 300px) { font-size: 0.9rem; }
    @media (min-width: 300px) and (max-width: 480px) { font-size: 1rem; }
    @media (min-width: 480px) and (max-width: 768px) { font-size: 1.14rem; }
    @media (min-width: 768px) and (max-width: 1200px) { font-size: 1.17rem; }
    @media (min-width: 1200px) { font-size: 1.2rem; }
`
export const LoginTxt = styled.p`
    width: 87%;
    font-size: 1.12rem;
    padding-top: 9px;
    @media (min-width: 1200px) { font-size: 1.20rem; }
`
export const VaultImg = styled.img`
    max-width: 85%;
    max-height: ${props => props.isEditing ? '50%' : '60%'};
    position: relative;
    top: ${props => !props.isEditing && '34%'};
    transform: ${props => !props.isEditing && 'translateY(-50%)'};
    -webkit-transform: ${props => !props.isEditing && 'translateY(-50%)'};
`
export const InputField = styled.input`
    width: 87%;
    padding: 7px 9px;
    border: 2px solid #120737;
    font-size: 1.15rem;
    background-color: black;
    text-align: center;
    word-wrap: break-word;
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
    @media (max-width: 351px) { font-size: 0.9rem; }
`
export const FileInputDiv = styled.div`
    display: inline-block;
    position: relative;
    overflow: hidden;
    margin-top: -3%;
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
export const AddVaultBtn = styled.button`
    border: 2px solid #120737;
    background-color: black;
    color: #bfbfbf;
    padding: 9px 11px;
    font-size: 0.97rem;
    margin-top: -3%;
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
export const VaultX = styled.a`
    color: #500000;
    font-size: 1.9rem;
    font-weight: 600;
    text-decoration: none;
    align-self: flex-end;
    transform: scaleX(1.1) scaleY(0.9);
    margin-right: 2%;
    margin-top: -5%;
    cursor: pointer;
    transition: .35s;
    :hover {
        color: #8b0000;
    }
`
export const VaultErrorMsg = styled.p`
    margin-top: -4%;
    margin-bottom: -3%;
    font-size: 0.9rem;
    color: #8b0000;
`