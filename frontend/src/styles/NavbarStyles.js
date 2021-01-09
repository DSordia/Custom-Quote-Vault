import styled from 'styled-components'

export const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 2;
  height: 45px;
  background-color: #120737;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
export const NavTitle = styled.a`
  color: #04b2ef;
  font-size: 1rem;
  margin-left: 1.5%;
  text-decoration: none;
  cursor: pointer;
  transition: .35s;
  :hover {
    color: #17d3ff;
  }
`
export const NavLoginOrSignout = styled.a`
  border: 2px solid black;
  color: #bfbfbf;
  margin-right: 3%;
  padding: 7px 9px;
  font-size: 0.9rem;
  cursor: pointer;
  text-decoration: none;
  transition: .35s;
  :hover {
    color: white;
  }
`