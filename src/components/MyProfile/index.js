import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import './index.css'
// https://apis.ccbp.in/insta-share/users/{userId}

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
  }

  componentDidMount() {
    this.gettingUserProfileDetails()
  }

  gettingUserProfileDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
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
    console.log(data)
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
    console.log(formattedData)
    this.setState({userDetails: formattedData})
  }

  render() {
    const {userDetails} = this.state
    const {
      followersCount,
      followingCount,
      posts,
      postsCount,
      userId,
      userName,
      profilePic,
      userBio,
      stories,
    } = userDetails
    return (
      <div>
        <Header />
        <div className="bio-section">
          <p className="user-profile-name">{userName}</p>
          <div className="user-profile-details">
            <img
              className="user-profile-pic"
              alt="user profile"
              src={profilePic}
            />

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
          <p className="userid-style">{userId}</p>
          <p className="bio-style">{userBio}</p>
          <div className="user-profile-story-container">
            {stories.map(eachStory => (
              <img
                className="user-profile-story-pic"
                alt="user story"
                key={eachStory.id}
                src={eachStory.image}
              />
            ))}
          </div>
        </div>
        <div className="bio-section-large-devices">
          <img
            className="user-profile-pic"
            alt="user profile"
            src={profilePic}
          />
          <div>
            <p className="user-profile-name">{userName}</p>
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
            <p className="userid-style">{userId}</p>
            <p className="bio-style">{userBio}</p>
          </div>
        </div>
        <div className="stories-large-devices">
          {stories.map(eachStory => (
            <img
              className="user-profile-story-pic"
              alt="user story"
              key={eachStory.id}
              src={eachStory.image}
            />
          ))}
        </div>
        <div>
          <p className="posts-bottom-section-heading">Posts</p>
          <div className="user-profile-post-container">
            {posts.map(eachPost => (
              <img
                className="post-image-size"
                alt="user post"
                src={eachPost.image}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default UserProfile
