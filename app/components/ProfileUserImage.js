import React from 'react'

const ProfileUserImage = ({
  src
}) => {
    return  <div className="label MuiAvatar-root MuiAvatar-circle">
    <img
      src={src ? src : "https://mdbootstrap.com/img/Photos/Avatars/avatar-1-mini.jpg"}
      alt=""
      className="rounded-circle z-depth-1-half MuiAvatar-img"
    />
  </div>
}

export default ProfileUserImage