import {Component} from 'react'
import {Link, withRouter, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'
import {GiHamburgerMenu} from 'react-icons/gi'

import {AiFillCloseCircle} from 'react-icons/ai'

import {FaSearch} from 'react-icons/fa'

class Header extends Component {
  state = {hamburgerDispaly: false, searchbar: false}

  onclickingMenu = () => {
    this.setState(prevState => ({hamburgerDispaly: true}))
    // console.log(this.props)
  }

  onCLosingMenu = () => {
    this.setState({hamburgerDispaly: false})
  }

  showingSearchBar = () => {
    this.setState(prevState => ({searchbar: !prevState.searchbar}))
  }

  loggingOut = () => {
    const {history} = this.props

    console.log(history)
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  onSearching = event => {
    const {searchingInput} = this.props
    searchingInput(event.target.value)
  }

  render() {
    const {hamburgerDispaly, searchbar} = this.state
    const {match} = this.props
    const {path} = match

    return (
      <nav className="header-style">
        <div className="top-header-section">
          <div className="logo-heading-container">
            <Link className="Link-cont" to="/">
              <img
                alt="website logo"
                className="header-website-logo"
                src="https://res.cloudinary.com/tejeshreddy17/image/upload/v1643731640/Standard_Collection_8_dwi8fj.jpg"
              />
            </Link>
            <h1 className="header-heading">Insta Share</h1>
          </div>
          <button
            type="button"
            onClick={this.onclickingMenu}
            className="hamburguer-menu"
          >
            <GiHamburgerMenu />
          </button>
          <div className="menu-section-large-view">
            <div className="menu-section-top">
              <div className="search-bar">
                <input
                  placeholder="Search Caption"
                  onChange={this.onSearching}
                  className="input-search-style"
                  type="search"
                />
                <button type="button" className="search-icon-search-bar">
                  <FaSearch />
                </button>
              </div>
              <Link className="link-cont" to="/">
                <button
                  type="button"
                  className={
                    path === '/'
                      ? 'home-profile selected-button'
                      : 'home-profile'
                  }
                >
                  Home
                </button>
              </Link>
              <Link className="link-cont" to="/my-profile">
                <button
                  type="button"
                  className={
                    path === '/my-profile'
                      ? 'home-profile selected-button'
                      : 'home-profile'
                  }
                >
                  Profile
                </button>
              </Link>
              <button
                className="logout-button"
                onClick={this.loggingOut}
                type="button"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
        {hamburgerDispaly && (
          <div className="menu-section">
            <div className="menu-section-top">
              <Link className="link-cont" to="/">
                <button
                  type="button"
                  className={`home-profile ${
                    path === '/' ? 'selected-button' : ''
                  }`}
                >
                  Home
                </button>
              </Link>
              <button
                onClick={this.showingSearchBar}
                type="button"
                className={`search-button ${
                  searchbar === true ? 'selected-button' : ''
                }`}
              >
                Search
              </button>
              <Link className="link-cont" to="/my-profile">
                <button type="button" className="home-profile ">
                  {' '}
                  Profile
                </button>
              </Link>
              <button
                className="logout-button"
                onClick={this.loggingOut}
                type="button"
              >
                Logout
              </button>
              <button
                type="button"
                className="close-button"
                onClick={this.onCLosingMenu}
              >
                <AiFillCloseCircle />
              </button>
            </div>
            {searchbar && (
              <div className="search-bar">
                <input
                  placeholder="Search Caption"
                  onChange={this.onSearching}
                  className="input-search-style"
                  type="search"
                />
                <FaSearch />
              </div>
            )}
          </div>
        )}
      </nav>
    )
  }
}

export default withRouter(Header)
