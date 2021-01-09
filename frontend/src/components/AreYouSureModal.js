import { ModalDiv, ModalNavX, AreYouSureTxt, BtnsDiv, AreYouSureBtn } from '../styles/AreYouSureModalStyles'

const AreYouSureModal = props => {
    return (
        <ModalDiv>
            <ModalNavX onClick={props.closeAreYouSureModal}>X</ModalNavX>
            <AreYouSureTxt>
                {props.areYouSureTxt}
            </AreYouSureTxt>
            <BtnsDiv>
                <AreYouSureBtn onClick={() => {props.delete(); props.closeAreYouSureModal()}}>
                    {props.yesTxt}
                </AreYouSureBtn>
                <AreYouSureBtn onClick={props.closeAreYouSureModal}>
                    No, Cancel.
                </AreYouSureBtn>
            </BtnsDiv>
        </ModalDiv>
    )
  }
  
  export default AreYouSureModal