import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const SidebarData = [
	{
		title: "Strona główna",
		path: "/home",
		icon: <AiIcons.AiFillHome />,
		cName: "nav-text",
	},
	{
		title: "Oceń samopoczucie",
		path: "/questionnaire",
		icon: <IoIcons.IoIosPaper />,
		cName: "nav-text",
	},
	{
		title: "Dodaj powiadomienie",
		path: "/notification",
		icon: <IoIcons.IoIosAlarm />,
		cName: "nav-text",
	},
	{
		title: "Zarządzaj powiadomieniami",
		path: "/notificationdelete",
		icon: <IoIcons.IoIosRemoveCircle />,
		cName: "nav-text",
	},
	{
		title: "Konfiguruj profl",
		path: "/illness",
		icon: <IoIcons.IoMdPerson />,
		cName: "nav-text",
	},
];
