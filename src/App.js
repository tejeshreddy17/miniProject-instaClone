import {Switch, Route} from 'react-router-dom'
import LoginPage from './components/login'
import Home from './components/Home'
import UserProfile from './components/UserProfile'
import MyProfile from './components/MyProfile'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginPage} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/users/:id" component={UserProfile} />
    <ProtectedRoute exact path="/my-profile" component={MyProfile} />
  </Switch>
)

export default App
