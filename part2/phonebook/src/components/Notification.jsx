/** @format */

import React from "react";

const Notification = ({ message }) => {
	// console.log("Notification.jsx: message:", message);
	if (message === null) {
		return null;
	}

	return <div className={message.type}>{message.message}</div>;
};

export default Notification;
