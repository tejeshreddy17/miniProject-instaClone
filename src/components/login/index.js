import {Component} from 'react'
import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

class LoginPage extends Component {
  state = {username: '', password: '', erroMsg: '', showErrorMsg: false}

  onChangingUsernameInput = event => {
    this.setState({username: event.target.value})
  }

  onChangingPasswordInput = event => {
    this.setState({password: event.target.value})
  }

  onLoginSuccess = token => {
    const {history} = this.props
    Cookies.set('jwt_token', token, {expires: 1})
    history.replace('/')
  }

  onSubmittingLoginButton = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const details = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(details),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.onLoginSuccess(data.jwt_token)
    } else {
      this.setState({showErrorMsg: true, erroMsg: data.error_msg})
    }
  }

  render() {
    const {username, password, showErrorMsg, erroMsg} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-page-background">
        <img
          className="landing-image"
          src="https://res.cloudinary.com/tejeshreddy17/image/upload/v1643731178/Layer_2_2_anmexb.jpg"
          alt="website login"
        />
        <form
          onSubmit={this.onSubmittingLoginButton}
          className="login-input-details"
        >
          <img
            alt="website logo"
            className="login-logo-style"
            src="https://res.cloudinary.com/tejeshreddy17/image/upload/v1643731640/Standard_Collection_8_dwi8fj.jpg"
          />
          <h1 className="insta-heading">Insta Share</h1>
          <label className="label-style" htmlFor="login-input">
            USERNAME
          </label>
          <input
            className="login-input-box-style"
            type="text"
            id="login-input"
            placeholder="Username"
            onChange={this.onChangingUsernameInput}
            value={username}
          />
          <label className="label-style" htmlFor="password-input">
            PASSWORD
          </label>
          <input
            className="login-password-input-style"
            type="password"
            id="password-input"
            placeholder="Password"
            onChange={this.onChangingPasswordInput}
            value={password}
          />
          {showErrorMsg && <p className="error-msg">{erroMsg}</p>}
          <button className="login-button" type="submit">
            Login
          </button>
        </form>
      </div>
    )
  }
}

export default LoginPage
