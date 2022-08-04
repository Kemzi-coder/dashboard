import React from "react";
import PropTypes from "prop-types";

const Avatar = ({imagePath}) => <img src={imagePath} alt="avatar" />;

Avatar.propTypes = {
	imagePath: PropTypes.string.isRequired
};

export default Avatar;
