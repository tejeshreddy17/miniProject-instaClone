import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'
import Header from '../Header'
import './index.css'
// https://apis.ccbp.in/insta-share/users/{userId}

const apiStatusConstants = {
  initial: 'initial',
  success: 'success',
  failure: 'failure',
  loading: 'loading',
}
class UserProfile extends Component {
  state = {
    userDetails: {
      followersCount: '',
      followingCount: '',
      id: '',
      posts: [],
      postsCount: '',
      profilePic: '',
      stories: [],
      userBio: '',
      userId: '',
      userName: '',
    },
    loadingStatus: apiStatusConstants.initial,
    presentScreenSize: window.innerWidth,
  }

  componentDidMount() {
    this.gettingUserProfileDetails()
  }

  gettingUserProfileDetails = async () => {
    this.setState({loadingStatus: apiStatusConstants.loading})

    const apiUrl = 'https://apis.ccbp.in/insta-share/my-profile'
    const token = Cookies.get('jwt_token')

    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    // console.log(data)
    if (response.ok === true) {
      const formattedData = {
        followersCount: data.profile.followers_count,
        followingCount: data.profile.following_count,
        id: data.profile.id,
        posts: data.profile.posts,
        postsCount: data.profile.posts_count,
        profilePic: data.profile.profile_pic,
        stories: data.profile.stories,
        userBio: data.profile.user_bio,
        userId: data.profile.user_id,
        userName: data.profile.user_name,
      }
      // console.log(formattedData)
      this.setState({
        userDetails: formattedData,
        loadingStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({loadingStatus: apiStatusConstants.failure})
    }
  }

  renderingLoader = () => (
    <div className="myprofile-loader-container" testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderngBioSection = () => {
    const {userDetails, presentScreenSize} = this.state
    const {
      followersCount,
      followingCount,
      postsCount,
      userId,
      userName,
      profilePic,
      userBio,
      stories,
    } = userDetails
    if (presentScreenSize > 576) {
      return (
        <div className="bio-section">
          <div className="user-profile-details">
            <img
              className="user-profile-pic"
              alt="my profile"
              src={profilePic}
            />
            <div className="bio-section-details-container">
              <h1 className="user-profile-name-large-devices">{userName}</h1>
              <div className="posts-followers-container">
                <div className="details-container">
                  <p className="posts-heading">{postsCount}</p>
                  <p className="posts-subheading">posts</p>
                </div>
                <div className="details-container">
                  <p className="posts-heading">{followersCount}</p>
                  <p className="posts-subheading">followers</p>
                </div>
                <div className="details-container">
                  <p className="posts-heading">{followingCount}</p>
                  <p className="posts-subheading">following</p>
                </div>
              </div>
              <p className="userid-style-large-devices">{userId}</p>
              <p className="bio-style-large-devices">{userBio}</p>
            </div>
          </div>

          <ul className="user-profile-story-container">
            {stories.map(eachStory => (
              <li key={eachStory.id} className="li-style">
                <img
                  className="user-profile-story-pic"
                  alt="my story"
                  src={eachStory.image}
                />
              </li>
            ))}
          </ul>
        </div>
      )
    }
    return (
      <div className="bio-section">
        <h1 className="user-profile-name">{userName}</h1>
        <div className="user-profile-details">
          <img className="user-profile-pic" alt="my profile" src={profilePic} />
          <div className="bio-section-details-container">
            <div className="posts-followers-container">
              <div className="details-container">
                <p className="posts-heading">{postsCount}</p>
                <p className="posts-subheading">posts</p>
              </div>
              <div className="details-container">
                <p className="posts-heading">{followersCount}</p>
                <p className="posts-subheading">followers</p>
              </div>
              <div className="details-container">
                <p className="posts-heading">{followingCount}</p>
                <p className="posts-subheading">following</p>
              </div>
            </div>
          </div>
        </div>
        <p className="userid-style">{userId}</p>
        <p className="bio-style">{userBio}</p>
        <ul className="user-profile-story-container">
          {stories.map(eachStory => (
            <li key={eachStory.id} className="li-style">
              <img
                className="user-profile-story-pic"
                alt="my story"
                src={eachStory.image}
              />
            </li>
          ))}
        </ul>
      </div>
    )
  }

  renderingContent = () => {
    const {userDetails} = this.state
    const {posts} = userDetails

    return (
      <>
        {this.renderngBioSection()}
        <div>
          <div className="posts-heading-icon-container">
            <BsGrid3X3 />
            <h1 className="posts-bottom-section-heading">Posts</h1>
          </div>
          {posts.length === 0 ? (
            <div>
              <BiCamera />
              <h1>No Posts</h1>
            </div>
          ) : (
            <ul className="user-profile-post-container">
              {posts.map(eachPost => (
                <li key={eachPost.id} className="li-style">
                  <img
                    className="post-image-size"
                    alt="my post"
                    src={eachPost.image}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
        )
      </>
    )
  }

  renderingPage = () => {
    const {loadingStatus} = this.state
    switch (loadingStatus) {
      case apiStatusConstants.loading:
        return this.renderingLoader()
      case apiStatusConstants.failure:
        return this.renderingFailureView()
      case apiStatusConstants.success:
        return this.renderingContent()
      default:
        return null
    }
  }

  renderingFailureView = () => (
    <div className="my-profile-failure-view">
      <img
        className="failure-view-image-my-profile"
        src="https://res.cloudinary.com/tejeshreddy17/image/upload/v1643995483/Group_7522_rbojul.jpg"
        alt="failure view"
      />
      <p className="failure-view-description">
        Something went wrong. Please try again
      </p>
      <button
        className="failure-view-button"
        onClick={this.gettingUserProfileDetails}
        type="button"
      >
        Try again
      </button>
    </div>
  )

  checking = () => {
    this.setState({presentScreenSize: window.innerWidth})
  }

  render() {
    return (
      <div>
        <Header />
        {this.renderingPage()}
        {window.addEventListener('resize', this.checking)}
      </div>
    )
  }
}

export default UserProfile
