import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import * as FaIcons from "react-icons/fa";

import { SidebarData } from "./SidebarData";
import { Button } from "react-bootstrap";
import ActionButton from "../basicControls/ActionButton";
import { useCookies } from "react-cookie";
import logo from "./../../styles/images/logo-fornavbar.png";

const MenuIconOpen = styled(Link)`
	display: flex;
	justify-content: start;
	font-size: 1.5rem;
	margin-left: 2rem;
	color: #ffffff;
`;

const MenuIconClose = styled(Link)`
	display: flex;
	justify-content: end;
	font-size: 1.5rem;
	margin-top: 0.75rem;
	margin-right: 1rem;
	color: #000000;
`;

const SidebarMenu = styled.div<{ close: boolean }>`
	width: 250px;
	height: 100vh;
	background-color: #ffffff;
	position: fixed;
	top: 0;
	left: ${({ close }) => (close ? "0" : "-100%")};
	transition: 0.6s;
	font-family: "Nunito", sans-serif;
	font-weight: 500;
	width: 300px;
`;

const MenuItems = styled.li`
	list-style: none;
	display: flex;
	align-items: center;
	justify-content: start;
	width: 100%;
	height: 100px;
	padding: 1rem 0 1.25rem;
	font-family: "Nunito", sans-serif;
	color: #000000;
`;

const MenuItemLinks = styled(Link)`
	display: flex;
	align-items: center;
	padding: 0 2rem;
	font-size: 20px;
	text-decoration: none;
	color: #000000;

	&:hover {
		background-color: #f0f8ff;
		border-radius: 5px;
		margin: 0 0.4rem;
	}
`;

const Sidebar: React.FunctionComponent = () => {
	const [close, setClose] = useState(false);
	const showSidebar = () => setClose(!close);
	let navigate = useNavigate();

	const [cookies, setCookie, removeCookie] = useCookies();

	const logout = () => {
		removeCookie("jwt");
		navigate("/");
	};

	return (
		<>
			<div className="navbar">
				<MenuIconOpen to="#" onClick={showSidebar}>
					<FaIcons.FaBars />
				</MenuIconOpen>
				<div className="logo-innavbar">
					<img src={logo} width="60" height="60" />
				</div>
				<ActionButton value={"Wyloguj"} className={"button"} onClick={logout} />
			</div>

			<SidebarMenu close={close}>
				<MenuIconClose to="#" onClick={showSidebar}>
					<FaIcons.FaTimes />
				</MenuIconClose>

				{SidebarData.map((item, index) => {
					return (
						<MenuItems key={index}>
							<MenuItemLinks to={item.path}>
								{item.icon}
								<span style={{ marginLeft: "12px" }}>{item.title}</span>
							</MenuItemLinks>
						</MenuItems>
					);
				})}
			</SidebarMenu>
		</>
	);
};

export default Sidebar;
