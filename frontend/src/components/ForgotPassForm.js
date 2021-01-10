import React, { useState } from 'react'
import { ForgotFormDiv, InputLabel, ForgotInputField, SubmitBtn,
         SubmittedTxt, ErrorMsg, ForgotPassTitle } from '../styles/LoginSignupFormsStyles'
import consts from '../constants'
import axios from 'axios'

const ForgotPassForm = () => {
    const [email, setEmail] = useState('')
    const [emailErrMsg, setEmailErrMsg] = useState('')
    const [forgotPassSubmitted, setForgotPassSubmitted] = useState(false)

    const typeEmail = input => { setEmail(input); setEmailErrMsg('') }

    const onForgotPassSubmitted = async () => {
        //Check if field is empty
        if (email.trim().length === 0) {
            setEmailErrMsg('Enter an email address.')
        } else {
            const emailObj = {email: email.toLowerCase()}
            try {
                await axios.get('/api/users/forgot', {params: emailObj})
                setForgotPassSubmitted(true) //email is now sent
            } catch (e) {
                //if catch, then user doesn't exist (email is invalid)
                setEmailErrMsg(consts.EMAIL_DOESNT_EXIST)
            }
        }
    }

    return (
        <ForgotFormDiv>
            {!forgotPassSubmitted ?
                <>
                    <ForgotPassTitle>Forgot Password?</ForgotPassTitle>
                    
                    <InputLabel>Enter Email Address:</InputLabel>

                    <ForgotInputField value={email}
                                      placeholder={'Email Address'}
                                      onChange={e => typeEmail(e.target.value)} />

                    <ErrorMsg>{emailErrMsg}</ErrorMsg>

                    <br />

                    <SubmitBtn isDisabled={emailErrMsg.length > 0}
                               onClick={e => {if (!emailErrMsg.length > 0) {
                                    onForgotPassSubmitted(e)
                               }}}>
                                   Submit
                    </SubmitBtn>
                </>
            :   <SubmittedTxt>
                    An email has been sent to {email} with instructions for resetting your password.
                </SubmittedTxt>}
        </ForgotFormDiv>
    )
  }
  
  export default ForgotPassForm