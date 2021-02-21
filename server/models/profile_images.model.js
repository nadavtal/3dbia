module.exports = (sequelize, DataTypes) => {
    const ProfileImage = sequelize.define("tbl_profile_images", {
      type: {
        type: DataTypes.STRING,
      },
      name: {
        type: DataTypes.STRING,
      },
      data: {
        type: DataTypes.BLOB("long"),
      },
      user_id: {
        type: DataTypes.INTEGER,
      },
      organization_id: {
        type: DataTypes.INTEGER,
      },
      provider_id: {
        type: DataTypes.INTEGER,
      },
      bridge_id: {
        type: DataTypes.INTEGER,
      },
    });
  
    return ProfileImage;
  };