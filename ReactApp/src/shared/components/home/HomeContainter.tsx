import { useState, useEffect, FC } from "react";
import ErrorPage from "../../basicControls/ErrorPage";
import { useCookies } from "react-cookie";
import Label from "../../basicControls/Label";
import { Link } from "react-router-dom";
import Notification from "../../basicControls/Notification";
import QuestionnaireHistory from "../questionnaire/QuestionnaireHistory";
import * as FcIcons from "react-icons/fc";
import UserResponseDto from "../../../pages/services/api/dto/UserResponseDto";
import { NotificationResponseDto } from "../../../pages/services/api/dto/NotificationResponseDto";
import { QuestionnaireResponseDto } from "../../../pages/services/api/dto/QuestionnaireResponseDto";
import { FetchUserDataFromResponse } from "../../../pages/services/api/mappers/FetchUserDataFromResponse";
import { apiPaths } from "../../../pages/services/api/apiPaths";
import { constans } from "../../../_shared/constans";

interface HomeContainerProps {
	user?: UserResponseDto;
}

const iconSize = 50;

const HomeContainer: FC<HomeContainerProps> = ({ user }) => {
	const [notifications, setNotifications] =
		useState<NotificationResponseDto[]>();
	const [responses, setResponses] = useState<QuestionnaireResponseDto[]>();
	const [loaded, setLoaded] = useState<boolean>(false);
	var uzytkownik = new FetchUserDataFromResponse(user!).userDataFromResponse();
	const [cookies, setCookie] = useCookies();
	const jwt = cookies.jwt;
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
	};
	const fetchQuestionnaireHistory = async () => {
		const response2 = await fetch(apiPaths.fetchQuestionnaireHistory, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
			body: JSON.stringify({
				jwt,
			}),
		});

		const content2 = await response2.json();
		setResponses(content2);
	};

	useEffect(() => {
		if (!loaded) {
			fetchQuestionnaireHistory();
			fetchNotifications();

			setLoaded(true);
		}
	});
	if (!uzytkownik) return <ErrorPage />;

	return (
		<div className="main-container">
			<div className="wrapper app-wrapper-home">
				<div className="header">
					<Label
						value={"Witaj, " + uzytkownik.firstName + "😊"}
						className="header-label"
					/>
				</div>
				<div className="element notifications">
					<div className="icon">
						<FcIcons.FcAlarmClock />
					</div>

					<Label value={constans.messages.dontforget} className="title"></Label>
					{notifications?.length == 0 ? (
						<Label
							value={constans.messages.emptyNotifications}
							className="label"
						/>
					) : null}
					{notifications?.map((notification) => (
						<Notification notification={notification} />
					))}
					<br />
					<Link to="/notificationdelete" className="submit">
						{constans.actions.manageNotifications}
					</Link>
				</div>
				<div className="element questionnaire">
					<div className="icon">
						<FcIcons.FcPortraitMode />
					</div>
					<Label value={constans.questionnaire.title} className="title" />
					<Link to="/questionnaire" className="submit">
						{constans.actions.questionnaireForm}
					</Link>
				</div>
				<div className="element history">
					<div className="icon">
						<FcIcons.FcStatistics />
					</div>
					<Label
						value={constans.titles.questionnaireHistory}
						className="title"
					/>
					<QuestionnaireHistory
						user={uzytkownik}
						questionnaireHistory={responses}
					/>
				</div>
			</div>
		</div>
	);
};

export default HomeContainer;
