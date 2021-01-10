import React, { Component } from 'react'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import ForgotPassForm from './ForgotPassForm'
import { connect } from 'react-redux'
import { getVaults } from '../actions/vaultActions'
import { initializeVaults } from '../actions/vaultActions'
import { login, signup } from '../actions/userActions'
import { withRouter } from 'react-router-dom'
import { GoogleLogin } from 'react-google-login'
import { ModalDiv, ModalNav, ModalNavTxt, ModalNavDivider, HR, ModalNavX, GoogleDiv } from '../styles/LoginSignupModalStyles'
import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()

class LoginSignupModal extends Component {
    state = {
        showLoginForm: true,
        showSignupForm: false,
        signedUp: false, //if true, logged in
        userID: '',
        initialized: false,
        googleClicked: false
    }

    static getDerivedStateFromProps(props, state) {
        if (props.isAuthenticated && state.googleClicked) {
            
            //Signed in with google for the first time
            if (state.signedUp && !state.initialized) {
                props.setUserID(state.userID)
                props.initializeVaults(state.userID)
                props.closeLoginSignupModal()
                return {initialized: true}

            //Logging in with google
            } else if (!state.signedUp) {
                props.setUserID(state.userID)
                props.getVaults(state.userID)
                props.closeLoginSignupModal()
                return null
            }
        } else {
            return null
        }
    }

    //Called after logging in from reset password route
    routeToMain = () => this.props.history.push('/')

    googleClicked = async response => {
        //Google handles authentication; create dummy user to generate vaults id
        const newUser = {email: response.googleId, password: null}
        const config = {headers: {'content-type': 'application/json'}}

        const res = await axios.post('/api/users', JSON.stringify(newUser), config)

        if (res.data.exists) {
            //user has already signed in with google before
            this.setState({signedUp: false, userID: res.data.user._id, googleClicked: true})
            this.props.login(res.data)
        } else {
            //user signing in with google for the first time
            this.setState({signedUp: true, userID: res.data.user._id, googleClicked: true})
            this.props.signup(res.data)
        }
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
                    <GoogleLogin
                        clientId={process.env.REACT_APP_GOOGLE_ID}
                        onSuccess={this.googleClicked}
                        onFailure={this.googleClicked} />
                </GoogleDiv>
            </ModalDiv>
        )
    }
}

const mapStateToProps = state => {
    return { isAuthenticated: state.user.isAuthenticated }
}

const mapDispatchToProps = () => {
    return { login, signup, getVaults, initializeVaults }
}

export default connect(mapStateToProps, mapDispatchToProps())(withRouter(LoginSignupModal))