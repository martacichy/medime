import React, { useState, useEffect, FC, SyntheticEvent } from "react";
import { constans } from "../../../_shared/constans";
import ActionButton from "../../basicControls/ActionButton";
import Label from "../../basicControls/Label";
import { Error } from "../../../pages/error/Error";
import UserData from "../../../models/UserData";
import { NotificationResponseDto } from "../../../pages/services/api/dto/NotificationResponseDto";
import UserResponseDto from "../../../pages/services/api/dto/UserResponseDto";
import * as FcIcons from "react-icons/fc";
import { showError, showSuccess } from "../toast/toastUtils";
import { apiPaths } from "../../../pages/services/api/apiPaths";
import { useCookies } from "react-cookie";
interface NotificationsListProps {
	user?: UserResponseDto;
}

const NotificationsList: FC<NotificationsListProps> = (
	props: NotificationsListProps
) => {
	const [notifications, setNotifications] =
		useState<NotificationResponseDto[]>();
	const [idToDelete, setidToDelete] = useState<number[]>([]);
	const [cookies, setCookie] = useCookies();
	const jwt = cookies.jwt;
	const [loaded, setLoaded] = useState(false);
	const fetchNotifications = async () => {
		const response = await fetch(apiPaths.fetchNotifications, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
			body: JSON.stringify({
				jwt,
			}),
		});
		const notificationFromResponse = await response.json();
		setNotifications(notificationFromResponse);
		setLoaded(true);
	};
	const deleteNotifications = async () => {
		if (idToDelete.length == 0) {
			showError("Nie wybrano żadnego powiadomienia!");
		} else {
			const response = await fetch(apiPaths.deleteNotifications, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				credentials: "include",
				body: JSON.stringify({
					idToDelete,
				}),
			});
			window.location.reload();
			showSuccess("Usunięto");
		}
	};

	useEffect(() => {
		if (!loaded) {
			fetchNotifications();
		}
	});

	return (
		<div className="main-container home-container">
			<div className="wrapper app-wrapper-page">
				{jwt ? (
					<div>
						<div className="icon">
							<FcIcons.FcSettings />
						</div>
						<Label
							className="title"
							value={constans.titles.notificationDelete}
						/>
						<br />
						{notifications?.map(
							(
								{ Id, Description, Frequency, MedicineName, Illness },
								checked
							) => {
								return (
									<div className="">
										<input
											type="checkbox"
											id={""}
											name={""}
											onChange={(e) => setidToDelete([...idToDelete, Id])}
											className="input-select"
										/>
										<Label
											value={
												"Powiadomienie o: " +
												Description +
												" " +
												MedicineName +
												" wyświetlane o: " +
												Frequency +
												" - " +
												Illness
											}
											className="label"
										/>
									</div>
								);
							}
						)}
						<ActionButton
							value={constans.messages.delete}
							className={"button"}
							onClick={deleteNotifications}
						/>
					</div>
				) : (
					<Error />
				)}
			</div>
		</div>
	);
};

export default NotificationsList;
