import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormDiv, LoginInputLabel, InputField, LoginBtn,
         ForgotPassTxtDiv, ForgotPassTxt, ErrorMsg } from '../styles/LoginSignupFormsStyles'
import { getVaults } from '../actions/vaultActions'
import { login } from '../actions/userActions'
import consts from '../constants'
import axios from 'axios'

class LoginForm extends Component {
    state = {
        email: '',
        pass: '',
        emailErr: false,
        passErr: false,
        emailErrMsg: '',
        passErrMsg: '',
        loginClicked: false
    }

    static getDerivedStateFromProps(props, state) {
        if (props.isAuthenticated && state.loginClicked) {
            props.setUserID(props.user.id)
            props.routeToMain()
            props.getVaults(props.user.id)
            props.closeLoginSignupModal()
        } else {
            return null
        }
    }

    typeEmail = input => this.setState({email: input, emailErr: false})

    typePass = input => this.setState({pass: input, passErr: false})

    onLoginClicked = async () => {
        this.setState({loginClicked: true})

        //Check if either field is empty
        let valid = true
        if (this.state.email.length === 0) {
            valid = false
            this.setState({emailErrMsg: 'Enter an email address.',
                           emailErr: true})
        }
        if (this.state.pass.length === 0) {
            valid = false
            this.setState({passErrMsg: 'Enter a password.',
                           passErr: true})
        }

        if (valid) {
            //authenticate user
            const user = {email: this.state.email.toLowerCase(), password: this.state.pass}
            const config = {headers: {'content-type': 'application/json'}}

            try {
                const res = await axios.post('/api/auth', JSON.stringify(user), config)
                this.setState({loginClicked: true})
                this.props.login(res.data)
            //if catch, then user user doesn't exist or invalid password
            } catch (e) {
                if (JSON.stringify(e.response.data) === '{"doesnt_exist":true}') {
                    this.setState({emailErr: true,
                                   emailErrMsg: consts.EMAIL_DOESNT_EXIST})
                } else if (JSON.stringify(e.response.data) === '{"invalid_password":true}') {
                    this.setState({passErr: true,
                                   passErrMsg: 'Invalid password.'})
                }
            }
        }
    }

    render() {
        const { toggleLoginForm } = this.props
        const { email, pass, emailErr, passErr, emailErrMsg, passErrMsg } = this.state
        const disabled = emailErr || passErr

        return (
            <FormDiv>
                <form>
                    <LoginInputLabel>Email:</LoginInputLabel>

                    <InputField value={email}
                                placeholder={'Email'}
                                onChange={e => this.typeEmail(e.target.value)} />

                    <ErrorMsg>{emailErr && emailErrMsg}</ErrorMsg>

                    <LoginInputLabel>Password:</LoginInputLabel>

                    <InputField value={pass}
                                placeholder={'Password'}
                                type={'password'}
                                onChange={e => this.typePass(e.target.value)} />

                    <ErrorMsg>{passErr && passErrMsg}</ErrorMsg>
                </form>

                <LoginBtn isDisabled={disabled}
                          onClick={() => {if (!disabled) this.onLoginClicked()}}>
                    Log In
                </LoginBtn>
                
                <ForgotPassTxtDiv>
                    <ForgotPassTxt onClick={toggleLoginForm}>Forgot Password?</ForgotPassTxt>
                </ForgotPassTxtDiv>
            </FormDiv>
        )
    }
}

const mapStateToProps = state => {
    return { isAuthenticated: state.user.isAuthenticated,
             user: state.user.user }
}

const mapDispatchToProps = () => {
    return { login, getVaults }
}

export default connect(mapStateToProps, mapDispatchToProps())(LoginForm)