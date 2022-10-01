import React, { useState, useEffect, FC, SyntheticEvent } from "react";
import { useCookies } from "react-cookie";
import { ToastContainer } from "react-toastify";
import UserData from "../../models/UserData";
import ConfigureNotification from "../../pages/ConfigureNotification";
import MainPage from "../../pages/MainPage";
import ManageNotification from "../../pages/ManageNotification";
import Questionnaire from "../../pages/Questionnaire";
import { apiPaths } from "../../pages/services/api/apiPaths";
import UserResponseDto from "../../pages/services/api/dto/UserResponseDto";
import ConfigureProfil from "./illness/ConfigureProfil";
import Sidebar from "./Sidebar";
interface PageTemplateProps {
	page: string;
	user?: UserData;
}

const PageTemplate: FC<PageTemplateProps> = (props: PageTemplateProps) => {
	const [user, setUser] = useState<UserResponseDto>();
	const [cookies, setCookie] = useCookies();
	const jwt = cookies.jwt;

	const getUser = async () => {
		const response = await fetch(apiPaths.getUser, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
			body: JSON.stringify({
				jwt,
			}),
		});
		const content = await response.json();

		setUser(content);
	};
	useEffect(() => {
		if (!user) {
			getUser();
		}
	});
	return (
		<>
			<Sidebar />
			{props.page == "home" ? <MainPage user={user} /> : null}
			{props.page == "questionnaire" ? <Questionnaire user={user} /> : null}
			{props.page == "illness" ? <ConfigureProfil user={user} /> : null}
			{props.page == "notification" ? (
				<ConfigureNotification user={user} />
			) : null}
			{props.page == "notificationdelete" ? (
				<ManageNotification user={user} />
			) : null}
			<ToastContainer />
		</>
	);
};

export default PageTemplate;
