import { Children, FC } from "react";
import { Pill } from "@thumbtack/thumbprint-react";
import { NotificationResponseDto } from "../../pages/services/api/dto/NotificationResponseDto";
interface NotificationProps {
	notification: NotificationResponseDto;
}

const Notification: FC<NotificationProps> = (props: NotificationProps) => {
	let description = "Przypomnienie o: " + props.notification.Description;

	if (props.notification.Illness != null) {
		const desc = description.concat(" (" + props.notification.Illness + ")");
		description = desc;
	}
	return (
		<div className="notification-content">
			<label className="pill">{props.notification.Frequency}</label>
			{props.notification.MedicineName ? (
				<label className="notification">
					{"Nie zapomnij o leku: " + props.notification.MedicineName}
				</label>
			) : null}

			<label className="notification">{description}</label>
		</div>
	);
};

export default Notification;
