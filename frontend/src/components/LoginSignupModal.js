import React, { Component } from 'react'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import ForgotPassForm from './ForgotPassForm'
import { connect } from 'react-redux'
import { login, signup } from '../actions/userActions'
import { getVaults, initializeVaults } from '../actions/vaultActions'
import { withRouter } from 'react-router-dom'
import { GoogleLogin } from 'react-google-login'
import { ModalDiv, ModalNav, ModalNavTxt, ModalNavDivider,
         HR, ModalNavX, GoogleDiv } from '../styles/LoginSignupModalStyles'
import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()

class LoginSignupModal extends Component {
    state = {
        showLoginForm: true,
        showSignupForm: false
    }

    //Called after logging in from reset password route
    routeToMain = () => this.props.history.push('/')

    googleClicked = async response => {
        //Google handles authentication; create dummy user to generate vaults id
        const newUser = {email: response.googleId, password: null}
        const config = {headers: {'content-type': 'application/json'}}

        console.log('posting in googleClicked')
        const res = await axios.post('/api/users', JSON.stringify(newUser), config)

        if (res.data.exists) {
            this.props.login(res.data)
            this.props.getVaults(res.data.user._id)
        } else {
            this.props.signup(res.data)
            this.props.initializeVaults(res.data.user._id)
        }
        
        this.props.setUserID(res.data.user._id)
        this.props.closeLoginSignupModal()
    }

    toggleLoginForm = () => this.setState({showLoginForm: !this.state.showLoginForm})
    setShowLoginForm = shouldShow => this.setState({showLoginForm: shouldShow})
    setShowSignupForm = shouldShow => this.setState({showSignupForm: shouldShow})

    render() {
        const { closeLoginSignupModal, setUserID } = this.props
        const { showLoginForm, showSignupForm } = this.state

        return (
            <ModalDiv>
                <ModalNav>
                    <ModalNavTxt onClick={() => {
                                    this.setShowLoginForm(true)
                                    this.setShowSignupForm(false)
                                 }}
                                 selected={showLoginForm}>
                                    Login
                    </ModalNavTxt>

                    <ModalNavDivider>|</ModalNavDivider>

                    <ModalNavTxt onClick={() => {
                                    this.setShowSignupForm(true)
                                    this.setShowLoginForm(false)
                                 }}
                                 selected={showSignupForm}>
                                     Signup
                    </ModalNavTxt>
                    <ModalNavX onClick={closeLoginSignupModal}>X</ModalNavX>
                </ModalNav>
                
                <HR />

                {showLoginForm ? <LoginForm routeToMain={this.routeToMain}
                                            setUserID={setUserID}
                                            toggleLoginForm={this.toggleLoginForm}
                                            closeLoginSignupModal={closeLoginSignupModal} />

                : showSignupForm ? <SignupForm routeToMain={this.routeToMain}
                                               setUserID={setUserID}
                                               closeLoginSignupModal={closeLoginSignupModal} />
                : <ForgotPassForm />}

                <GoogleDiv>
                    <GoogleLogin clientId={process.env.REACT_APP_GOOGLE_ID}
                                 onSuccess={this.googleClicked}
                                 onFailure={this.googleClicked} />
                </GoogleDiv>
            </ModalDiv>
        )
    }
}

const mapStateToProps = () => { return {} }

const mapDispatchToProps = () => {
    return { login, signup, getVaults, initializeVaults }
}

export default connect(mapStateToProps, mapDispatchToProps())(withRouter(LoginSignupModal))