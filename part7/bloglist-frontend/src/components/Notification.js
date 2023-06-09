/** @format */
import { useNotification } from "../contexts/NotificationContext";

const Notification = () => {
	const { message, alert } = useNotification();

	if (message === null) {
		return null;
	}

	return <div className={alert}>{message}</div>;
};

export default Notification;
