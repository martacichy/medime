import { FC } from "react";
import logo from "./../../styles/images/logo.png";

const Header: FC = () => {
	return (
		<div>
			<div className="appNameHead"></div>
			<div className="appLogo">
				<img src={logo} width="100" height="100" />
			</div>
		</div>
	);
};

export default Header;
