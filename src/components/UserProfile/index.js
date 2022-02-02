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
    const apiUrl = ` https://apis.ccbp.in/insta-share/users/${id}`
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
      followersCount: data.user_details.followers_count,
      followingCount: data.user_details.following_count,
      id: data.user_details.id,
      posts: data.user_details.posts,
      postsCount: data.user_details.posts_count,
      profilePic: data.user_details.profile_pic,
      stories: data.user_details.stories,
      userBio: data.user_details.user_bio,
      userId: data.user_details.user_id,
      userName: data.user_details.user_name,
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
        <div>
          <p>Posts</p>
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
