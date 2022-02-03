import {Component} from 'react'

import Cookies from 'js-cookie'
import Slider from 'react-slick'

import Header from '../Header'

import UserStories from '../UserStories'
import InstaPosts from '../InstaPosts'

import './index.css'

class Home extends Component {
  state = {homePosts: [], userStories: []}

  componentDidMount() {
    this.gettingUserHomeDetails()
    this.gettingUserStories()
  }

  searchingInput = async input => {
    console.log(input)
    this.setState({searchInput: input})
    const token = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/insta-share/posts?search=${input}`
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    // console.log(data)
    const formattedData = data.posts.map(eachPost => ({
      comments: eachPost.comments.map(eachComment => ({
        username: eachComment.user_name,
        comment: eachComment.comment,
        userId: eachComment.user_id,
      })),
      createdAt: eachPost.created_at,
      likesCount: eachPost.likes_count,
      postDetails: {
        caption: eachPost.post_details.caption,
        imageUrl: eachPost.post_details.image_url,
      },
      postId: eachPost.post_id,
      profilePic: eachPost.profile_pic,
      userId: eachPost.user_id,
      userName: eachPost.user_name,
      likeStatus: false,
    }))
    // console.log(formattedData)
    this.setState({homePosts: formattedData})
  }

  gettingUserHomeDetails = async () => {
    const token = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/insta-share/posts'
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    // console.log(data)
    const formattedData = data.posts.map(eachPost => ({
      comments: eachPost.comments.map(eachComment => ({
        username: eachComment.user_name,
        comment: eachComment.comment,
        userId: eachComment.user_id,
      })),
      createdAt: eachPost.created_at,
      likesCount: eachPost.likes_count,
      postDetails: {
        caption: eachPost.post_details.caption,
        imageUrl: eachPost.post_details.image_url,
      },
      postId: eachPost.post_id,
      profilePic: eachPost.profile_pic,
      userId: eachPost.user_id,
      userName: eachPost.user_name,
      likeStatus: false,
    }))
    // console.log(formattedData)
    this.setState({homePosts: formattedData})
  }

  gettingUserStories = async () => {
    const token = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/insta-share/stories'
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    // console.log(data)
    const formattedData = data.users_stories.map(eachStory => ({
      storyUrl: eachStory.story_url,
      userId: eachStory.user_id,
      userName: eachStory.user_name,
    }))
    // console.log(formattedData)
    this.setState({userStories: formattedData})
  }

  updatingLikeButton = async id => {
    const {homePosts} = this.state
    const token = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/insta-share/posts/${id}/like`
    const requestDetails = {like_status: true}
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'POST',
      body: JSON.stringify(requestDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(data)
    const updatedhomePosts = homePosts.map(eachPost => {
      if (eachPost.postId === id) {
        return {
          ...eachPost,
          likeStatus: true,
          likesCount: eachPost.likesCount + 1,
        }
      }
      return eachPost
    })
    this.setState({homePosts: updatedhomePosts})
  }

  updatingUnLikeButton = async id => {
    const {homePosts} = this.state

    const token = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/insta-share/posts/${id}/like`
    const requestDetails = {like_status: false}
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'POST',
      body: JSON.stringify(requestDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(data)
    const updatedhomePosts = homePosts.map(eachPost => {
      if (eachPost.postId === id) {
        return {
          ...eachPost,
          likeStatus: false,
          likesCount: eachPost.likesCount - 1,
        }
      }
      return eachPost
    })
    this.setState({homePosts: updatedhomePosts})
  }

  render() {
    const {userStories, homePosts} = this.state
    // console.log(homePosts)
    const settings = {
      dots: false,
      slidesToShow: 3,
      slidesToScroll: 1,
      infinite: false,
    }
    return (
      <div>
        <Header searchingInput={this.searchingInput} />
        <div className="HomeBackground">
          <div className="user-stories-container">
            <Slider {...settings}>
              {userStories.map(eachStory => (
                <UserStories key={eachStory.userId} story={eachStory} />
              ))}
            </Slider>
          </div>
          {homePosts.map(eachPost => (
            <InstaPosts
              updatingLikeButton={this.updatingLikeButton}
              updatingUnLikeButton={this.updatingUnLikeButton}
              key={eachPost.postId}
              eachPost={eachPost}
            />
          ))}
        </div>
      </div>
    )
  }
}
export default Home
