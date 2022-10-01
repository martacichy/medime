import { FC, useState } from "react";
import NotificationsList from "../shared/components/notification/NotificationsList";
import UserResponseDto from "./services/api/dto/UserResponseDto";

interface ManageNotificationProps {
	user?: UserResponseDto;
}

const ManageNotification: FC<ManageNotificationProps> = (
	props: ManageNotificationProps
) => {
	return <NotificationsList user={props.user} />;
};
export default ManageNotification;
