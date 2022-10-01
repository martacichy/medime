import React, { useState, useEffect, FC, SyntheticEvent } from "react";
import Header from "../../basicControls/Header";
import { constans } from "../../../_shared/constans";
import Label from "../../basicControls/Label";
import ActionButton from "../../basicControls/ActionButton";
import AddIllness from "./AddIllness";
import { useNavigate } from "react-router";
import UserData from "../../../models/UserData";
import AddNotification from "../notification/AddNotification";
import UserResponseDto from "../../../pages/services/api/dto/UserResponseDto";
import { Link } from "react-router-dom";

interface ConfigureProfilProps {
	user?: UserResponseDto;
}

const ConfigureProfil: FC<ConfigureProfilProps> = (
	props: ConfigureProfilProps
) => {
	const [visibleQuestion, setVisibleQuestion] = useState(false);
	const [visibleNextButton, setVisibleNextButton] = useState(false);

	const next = () => {
		let navigate = useNavigate();
		navigate("/notification");
	};
	const onSelectedYes = () => {
		setVisibleQuestion(true);
		setVisibleNextButton(true);
	};
	const onSelectedNo = () => {
		setVisibleNextButton(true);
	};

	return (
		<div className="main-container home-container">
			<div className="wrapper app-wrapper-page">
				<Header />
				<Label className="title" value={constans.configureProfil.title} />{" "}
				<br />
				<Label value={constans.configureProfil.illnesses} />
				<br />
				<ActionButton
					value={constans.messages.yes}
					className={"button"}
					onClick={onSelectedYes}
				/>
				<ActionButton
					value={constans.messages.no}
					className={"button"}
					onClick={onSelectedNo}
				/>
				<br />
				<AddIllness visible={visibleQuestion} />
				{visibleNextButton ? (
					<>
						<Label value={constans.configureProfil.nextHint} />
						<Link to="/notification" className="submit">
							{constans.messages.next}
						</Link>
					</>
				) : null}
			</div>
		</div>
	);
};

export default ConfigureProfil;
