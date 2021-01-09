import { Nav, NavTitle, NavLoginOrSignout } from '../styles/NavbarStyles'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../actions/userActions'

const Navbar = props => {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(state => state.user.isLoggedIn)

  const navLoginOrSignoutClicked = () => !isLoggedIn ? props.openLoginSignupModal() : dispatch(logout)

  return (
      <Nav>
        <NavTitle onClick={() => props.closeVault()}>Custom Quote Vault</NavTitle>
        <NavLoginOrSignout onClick={navLoginOrSignoutClicked}>{!isLoggedIn ? 'Login / Signup' : 'Sign Out'} </NavLoginOrSignout>
      </Nav>
  )
}
  
export default Navbar