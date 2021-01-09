import styled from 'styled-components'

export const ModalDiv = styled.div`
    position: absolute;
    z-index: 1;
    left: 50%;
    top: 9%;
    transform: translateX(-50%);
    height: 405px;
    background-color: #151515;
    color: white;
    @media (max-width: 480px) { width: 62%; margin-top: 10%; }
    @media (min-width: 480px) and (max-width: 768px) { width: 62%; margin-top: 6%; }
    @media (min-width: 768px) and (max-width: 1200px) { width: 50%; margin-top: 5%; }
    @media (min-width: 1200px) { width: 40%; margin-top: 3%; }
`
export const GoogleDiv = styled.div`
    position: fixed;
    bottom: 5%;
    left: 50%;
    transform: translate(-50%, 0);
`
export const ModalNav = styled.nav`
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
`
export const ModalNavTxt = styled.a`
    margin: 0 2.7%;
    text-decoration: none;
    cursor: pointer;
    transition: .35s;
    color: ${props => props.selected ? 'white' : '#bfbfbf'};
    :hover {
        color: white;
    }
`
export const ModalNavDivider = styled.p`
    color: #bfbfbf;
    font-size: 1.2rem;
    transform: scaleY(1.4);
`
export const HR = styled.hr`
    width: 50%;
    margin-top: -0.1%;
    margin-bottom: -1%;
    border: 0;
    height: 0;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
`
export const ModalNavX = styled.a`
    color: #bfbfbf;
    font-size: 1.6rem;
    font-weight: 600;
    text-decoration: none;
    transform: scaleX(1.1) scaleY(0.9);
    position: absolute;
    cursor: pointer;
    transition: .35s;
    :hover {
        color: white;
    }
    @media (max-width: 480px) { margin-left: 86%; }
    @media (min-width: 480px) and (max-width: 768px) { margin-left: 90%; }
    @media (min-width: 768px) { margin-left: 93.5%; }
`