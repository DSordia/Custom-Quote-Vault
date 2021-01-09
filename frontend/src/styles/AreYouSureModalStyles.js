import styled from 'styled-components'

export const ModalDiv = styled.div`
    position: fixed;
    z-index: 1;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    height: 200px;
    justify-content: space-between;
    flex-direction: column;
    background-color: #151515;
    color: white;
    @media (max-width: 480px) { width: 85%; margin-top: 13%; }
    @media (min-width: 480px) and (max-width: 768px) { width: 60%; margin-top: 9%; }
    @media (min-width: 768px) and (max-width: 1200px) { width: 45%; margin-top: 8%; }
    @media (min-width: 1200px) { width: 35%; margin-top: 6%; }
`
export const ModalNavX = styled.a`
    color: #bfbfbf;
    font-size: 1.6rem;
    font-weight: 600;
    text-decoration: none;
    align-self: flex-end;
    margin-right: 2%;
    transform: scaleX(1.1) scaleY(0.9);
    cursor: pointer;
    transition: .35s;
    :hover {
        color: white;
    }
`
export const AreYouSureTxt = styled.div`
    width: 75%;
    align-self: center;
    padding-bottom: 50px:
`
export const BtnsDiv = styled.div`
    display: flex;
    justify-content: center;
    padding-top: 4%;
    margin-bottom: 5%;
`
export const AreYouSureBtn = styled.button`
    background: #bfbfbf;
    padding: 5px 10px;
    margin: 0 2%;
    text-decoration: none;
    font-size: 0.95rem;
    transition: .35s;
    cursor: pointer;
    outline: none;
    :hover {
        background: white;
    }
    @media (max-width: 480px) { width: 40%; }
    @media (min-width: 480px) and (max-width: 768px) { width: 35%; }
    @media (min-width: 768px) and (max-width: 1200px) { width: 30%; }
    @media (min-width: 1200px) { width: 25%; }
`