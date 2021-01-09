import { useState } from 'react'
import { ResetForm, InputLabel, ResetInputField, ErrorMsg,
         ResetBtn, ResetTxt, LoginAfterResetBtn } from '../styles/LoginSignupFormsStyles'
import consts from '../constants'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const ResetPassword = props => {
    const [pass, setPass] = useState('')
    const [passErrMsg, setPassErrMsg] = useState('')
    const [reset, setReset] = useState(false)
    const { id } = useParams()

    const validatePass = input => {
        if (input.length < consts.MIN_PASSWORD_LENGTH) {
            setPassErrMsg(`Password must be at least ${consts.MIN_PASSWORD_LENGTH} characters.`)
        } else {
            setPassErrMsg('')
        }
        setPass(input)
    }

    const onResetClicked = () => {
        //check if field is empty
        if (pass.length === 0) {
            setPassErrMsg(`Password must be at least ${consts.MIN_PASSWORD_LENGTH} characters.`)
        } else {
            //update password in DB using id
            axios.patch(`/api/users/${id}`, {password: pass})
            setReset(true)
        }
    }
    
    return (
        <ResetForm>
            {!reset ?
                <>
                    <InputLabel>New Password:</InputLabel>

                    <ResetInputField value={pass}
                                     placeholder='New Password'
                                     type={'password'}
                                     onChange={e => validatePass(e.target.value)} />

                    <ErrorMsg>{passErrMsg}</ErrorMsg>

                    <ResetBtn isDisabled={passErrMsg.length > 0}
                              onClick={() => {if (!passErrMsg.length > 0) onResetClicked()}}>
                                  Reset Password
                    </ResetBtn>
                </>
            :   <>
                    <ResetTxt>Password has been reset.</ResetTxt>

                    <LoginAfterResetBtn onClick={props.openLoginSignupModal}>
                        Log in
                    </LoginAfterResetBtn>
                </>}
        </ResetForm>
    )
}

export default ResetPassword