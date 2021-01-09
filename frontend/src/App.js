import React, { useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import { Provider } from 'react-redux'
import store from './store'
import { BrowserRouter, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import LoginSignupModal from './components/LoginSignupModal'
import Vaults from './components/Vaults'
import ResetPassword from './components/ResetPassword'

const App = () => {
  const [loginSignupModalIsOpen, setLoginSignupModalIsOpen] = useState(false)
  const [shouldCloseVault, setShouldCloseVault] = useState(false)
  const [userID, setUserID] = useState()

  const closeLoginSignupModal = () => {if (loginSignupModalIsOpen) setLoginSignupModalIsOpen(false)}
  const openLoginSignupModal = () => {if (!loginSignupModalIsOpen) setLoginSignupModalIsOpen(true)}
  const openVault = () => setShouldCloseVault(false)
  const closeVault = () => setShouldCloseVault(true)
  const setID = id => setUserID(id)

  return (
    <Provider store={store}>
      <Navbar openLoginSignupModal={openLoginSignupModal} closeVault={closeVault} />

      <BrowserRouter>
        <Route exact path={'/'}>
          <CSSTransition in={loginSignupModalIsOpen} timeout={500} classNames='fadeModal' unmountOnExit>
            <LoginSignupModal closeLoginSignupModal={closeLoginSignupModal} setUserID={setID} />
          </CSSTransition>

          <Vaults userID={userID}
                  openLoginSignupModal={openLoginSignupModal}
                  shouldCloseVault={shouldCloseVault}
                  openVault={openVault} />
        </Route>

        <Route path={'/reset/:id'}>
          <CSSTransition in={loginSignupModalIsOpen} timeout={500} classNames='fadeModal' unmountOnExit>
            <LoginSignupModal closeLoginSignupModal={closeLoginSignupModal} setUserID={setID} />
          </CSSTransition>

          <ResetPassword openLoginSignupModal={openLoginSignupModal} />
        </Route>
      </BrowserRouter>
    </Provider>
  )
}

export default App