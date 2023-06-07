import { useNotification } from "../NotificationContext";

const Notification = () => {
	const style = {
		border: "solid",
		padding: 10,
		borderWidth: 1,
		marginBottom: 5,
	};

	const { message } = useNotification();

	return message ? <div style={style}>{message}</div> : null;
};

export default Notification;
