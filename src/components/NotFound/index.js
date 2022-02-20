import {Link} from 'react-router-dom'
import Header from '../Header'

import './index.css'

const NotFound = () => (
  <div>
    <Header />
    <div className="not-found-page">
      <img
        className="not-found-image"
        src="https://res.cloudinary.com/tejeshreddy17/image/upload/v1643982018/erroring_1_lyci8b.jpg"
        alt="page not found"
      />
      <h1 className="not-found-heading">Page Not Found</h1>
      <p className="not-found-description">
        we are sorry, the page you requested could not be found.Please go back
        to the homepage.
      </p>
      <Link to="/">
        <button className="home-page-button" type="button">
          Home Page
        </button>
      </Link>
    </div>
  </div>
)

export default NotFound
