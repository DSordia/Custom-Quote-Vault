import styled from 'styled-components'

export const FormDiv = styled.div`
    margin-top: 2%;
`
export const ResetForm = styled.div`
    left: 0;
    right: 0;
    top: 15%;
    margin-left: auto;
    margin-right: auto;
    background-color: #151515;
    display: flex;
    position: absolute;
    flex-direction: column;
    align-items: center;
    margin-bottom: -2%;
    text-color: white;
    color: white;
    @media (max-width: 480px) { width: 60%; margin-top: 21%; }
    @media (min-width: 480px) and (max-width: 768px) { width: 60%; margin-top: 12%; }
    @media (min-width: 768px) and (max-width: 1200px) { width: 48%; margin-top: 7%; }
    @media (min-width: 1200px) { width: 38%; margin-top: 5%; }
`
export const LoginInputLabel = styled.div`
    margin-bottom: 1.4%;
    font-size: 1rem;
    @media (max-width: 480px) { margin-top: 12%; }
    @media (min-width: 480px) and (max-width: 768px) { margin-top: 7%; }
    @media (min-width: 768px) and (max-width: 1200px) { margin-top: 5%; }
    @media (min-width: 1200px) { margin-top: 3%;}
`
export const SignupInputLabel = styled.div`
    margin-bottom: 1%;
    font-size: 1rem;
    @media (max-width: 480px) { margin-top: 10%; }
    @media (min-width: 480px) and (max-width: 768px) { margin-top: 6%; }
    @media (min-width: 768px) { margin-top: 4%; }
`
export const ResetInputLabel = styled.div`
    margin-bottom: 1.5%;
    font-size: 1rem;
    @media (max-width: 480px) { margin-top: 12%; }
    @media (min-width: 480px) and (max-width: 768px) { margin-top: 7%; }
    @media (min-width: 768px) and (max-width: 1200px) { margin-top: 5%; }
    @media (min-width: 1200px) { margin-top: 3%;}
`
export const InputField = styled.input`
    outline: none;
`
export const ResetInputField = styled.input`
    outline: none;
    margin-bottom: 0.5%;
`
export const ResetTxt = styled.p`
    margin-bottom: -2%;
`
export const SignupBtn = styled.button`
    background: #bfbfbf;
    padding: 10px 20px;
    text-decoration: none;
    font-size: 1rem;
    margin-top: 4%;
    transition: .35s;
    cursor: ${props => props.isDisabled ? 'not-allowed' : 'pointer'};
    outline: none;
    :hover {
        background: ${props => props.isDisabled ? '#bfbfbf' : 'white'};
    }
`
export const LoginBtn = styled.button`
    background: #bfbfbf;
    padding: 10px 20px;
    text-decoration: none;
    margin-top: 4%;
    margin-bottom: -2%;
    font-size: 1rem;
    transition: .35s;
    cursor: ${props => props.isDisabled ? 'not-allowed' : 'pointer'};
    outline: none;
    :hover {
        background: ${props => props.isDisabled ? '#bfbfbf' : 'white'};
    }
`
export const LoginAfterResetBtn = styled.button`
    background: #bfbfbf;
    padding: 8px 12px;
    text-decoration: none;
    margin-bottom: 2%;
    margin-top: 5%;
    font-size: 1rem;
    transition: .35s;
    cursor: ${props => props.isDisabled ? 'not-allowed' : 'pointer'};
    outline: none;
    :hover {
        background: ${props => props.isDisabled ? '#bfbfbf' : 'white'};
    }
`
export const ResetBtn = styled.button`
    background: #bfbfbf;
    padding: 8px 10px;
    text-decoration: none;
    margin-top: 3%;
    margin-bottom: 3%;
    font-size: 0.9rem;
    transition: .35s;
    cursor: ${props => props.isDisabled ? 'not-allowed' : 'pointer'};
    outline: none;
    :hover {
        background: ${props => props.isDisabled ? '#bfbfbf' : 'white'};
    }
`
export const ForgotPassTxtDiv = styled.div`
    @media (max-width: 480px) { margin-top: 12%; }
    @media (min-width: 480px) { margin-top: 6%; }
`
export const ForgotPassTxt = styled.a`
    color: #bfbfbf;
    cursor: pointer;
    text-decoration: underline;
    transition: .35s;
    :hover {
        color: white;
    }
`
export const ForgotFormDiv = styled.div`
    @media (max-width: 480px) { margin-top: 15%; }
    @media (min-width: 480px) and (max-width: 768px) { margin-top: 10%; }
    @media (min-width: 768px) { margin-top: 6%; }
`
export const InputLabel = styled.div`
    margin-top: 3%;
    font-size: 1rem;
    @media (max-width: 480px) { margin-bottom: 3%; }
    @media (min-width: 480px) and (max-width: 768px) { margin-bottom: 3%; }
    @media (min-width: 768px) { margin-bottom: 1.5%; }
`
export const ForgotPassTitle = styled.p`
    margin-top: -2%;
    font-size: 1.21rem;
    @media (max-width: 480px) { margin-bottom: 15%; }
    @media (min-width: 480px) and (max-width: 768px) { margin-bottom: 10%; }
    @media (min-width: 768px) { margin-bottom: 6%; }
`
export const ForgotInputField = styled.input`
    outline: none;
    margin-top: 0.5%;
`
export const SubmitBtn = styled.button`
    background: #bfbfbf;
    padding: 5px 10px;
    text-decoration: none;
    font-size: 0.9rem;
    transition: .35s;
    cursor: ${props => props.isDisabled ? 'not-allowed' : 'pointer'};
    outline: none;
    :hover {
        background: ${props => props.isDisabled ? '#bfbfbf' : 'white'};
    }
    @media (max-width: 480px) { margin-top: 8%; }
    @media (min-width: 480px) and (max-width: 768px) { margin-top: 5%; }
    @media (min-width: 768px) { margin-top: 4%; }
`
export const SubmittedTxt = styled.div`
    width: 60%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 10%;  
`
export const SignupFormDiv = styled.form`
    margin-top: 8%;
`
export const ErrorMsg = styled.p`
    margin: 0.8% auto;
    font-size: 0.85rem;
    color: #d90000;
    width: 90%;
`