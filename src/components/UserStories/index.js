import './index.css'

const UserStories = props => {
  const {story} = props
  const {userName, storyUrl} = story
  return (
    <div className="story-container">
      <img alt="user story" className="story-image" src={storyUrl} />
      <p className="story-user-name">{userName}</p>
    </div>
  )
}

export default UserStories
