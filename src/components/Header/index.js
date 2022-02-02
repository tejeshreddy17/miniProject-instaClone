import {Component} from 'react'
import {Link} from 'react-router-dom'
import './index.css'

class Header extends Component {
  render() {
    return (
      <nav className="header-style">
        <Link className="Link-cont" to="/">
          <img
            alt="website logo"
            className="header-website-logo"
            src="https://res.cloudinary.com/tejeshreddy17/image/upload/v1643731640/Standard_Collection_8_dwi8fj.jpg"
          />
          <h1>Insta Share</h1>
        </Link>
      </nav>
    )
  }
}

export default Header
