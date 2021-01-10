import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signup } from '../actions/userActions'
import { initializeVaults } from '../actions/vaultActions'
import consts from '../constants'
import { FormDiv, SignupFormDiv, SignupInputLabel,
         InputField, SignupBtn, ErrorMsg } from '../styles/LoginSignupFormsStyles'
import axios from 'axios'

class SignupForm extends Component {
    state = {
        email: '',
        pass: '',
        emailErr: false,
        passErr: false,
        emailErrMsg: '',
        passErrMsg: '',
        initialized: false
    }

    static getDerivedStateFromProps(props, state) {
        if (props.isAuthenticated && !state.initialized) {
            props.setUserID(props.user.id)
            props.initializeVaults(props.user.id)
            props.routeToMain()
            props.closeLoginSignupModal()
            return {initialized: true}
        }
        return null
    }

    validateEmail = input => {
        if (/\s/.test(input)) {
            this.setState({email: input,
                           emailErr: true,
                           emailErrMsg: 'Email cannot contain any whitespace.'})
        } else {
            this.setState({email: input,
                           emailErr: false})
        }
    }

    validatePass = input => {
        if (input.length < consts.MIN_PASSWORD_LENGTH) {
            this.setState({pass: input,
                           passErr: true,
                           passErrMsg: `Password must be at least ${consts.MIN_PASSWORD_LENGTH} characters.`})
        } else {
            this.setState({pass: input,
                           passErr: false})
        }
    }

    onSignupClicked = async () => {
        let valid = true
        
        //Check if either field is empty
        if (this.state.email.trim().length === 0) {
            valid = false
            this.setState({emailErrMsg: 'Enter an email address.',
                           emailErr: true})
        }
        if (this.state.pass.trim().length === 0) {
            valid = false
            this.setState({passErrMsg: 'Enter a password.',
                           passErr: true})
        }

        if (valid) {
            const newUser = {email: this.state.email, password: this.state.pass}
            const config = {headers: {'content-type': 'application/json'}}

            //add new user to DB
            const res = await axios.post('/api/users', JSON.stringify(newUser), config)
            if (res.data.exists) {
                this.setState({emailErr: true,
                               emailErrMsg: 'A user with this email already exists.'})
            } else {
                this.props.signup(res.data)
            }
        }
    }

    render() {
        const { email, pass, emailErr, passErr, emailErrMsg, passErrMsg } = this.state
        const disabled = emailErr || passErr

        return (
            <FormDiv>
                <SignupFormDiv>
                    <SignupInputLabel>Email:</SignupInputLabel>
                    
                    <InputField value={email}
                                placeholder={'Email'}
                                onChange={e => this.validateEmail(e.target.value)} />

                    <ErrorMsg>{emailErr && emailErrMsg}</ErrorMsg>

                    <SignupInputLabel>Password:</SignupInputLabel>

                    <InputField value={pass}
                                placeholder={'Password'}
                                type={'password'}
                                onChange={e => this.validatePass(e.target.value)} />

                    <ErrorMsg>{passErr && passErrMsg}</ErrorMsg>
                </SignupFormDiv>
                
                <SignupBtn isDisabled={disabled}
                           onClick={() => {if (!disabled) this.onSignupClicked()}}>
                               Sign Up
                </SignupBtn>
            </FormDiv>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.user.isAuthenticated,
        user: state.user.user
    }
}

const mapDispatchToProps = () => {
    return { signup, initializeVaults }
}

export default connect(mapStateToProps, mapDispatchToProps())(SignupForm)