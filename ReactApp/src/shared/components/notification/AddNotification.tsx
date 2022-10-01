import React, { useState, useEffect, FC } from "react";
import { constans } from "../../../_shared/constans";
import ActionButton from "../../basicControls/ActionButton";
import Label from "../../basicControls/Label";
import { Illness } from "../../../models/Ilness";
import { useCookies } from "react-cookie";
import { notificationHour } from "../../../_shared/notificationHourData";
import Select from "react-select";
import { showError, showSuccess, showWarning } from "../toast/toastUtils";
import UserResponseDto from "../../../pages/services/api/dto/UserResponseDto";
import * as FcIcons from "react-icons/fc";
import { apiPaths } from "../../../pages/services/api/apiPaths";

interface AddNotificationProps {
	user?: UserResponseDto;
}

const AddNotification: FC<AddNotificationProps> = (
	props: AddNotificationProps
) => {
	const [illnessData, setIllnessData] = useState<Illness[]>([]);
	const [cookies, setCookie] = useCookies();
	const jwt = cookies.jwt;
	const [pobrane, setPobrane] = useState(false);
	const [item, setItem] = useState("");
	const [checkedMedicine, setCheckedMedicine] = React.useState(false);
	const [checkedIllness, setCheckedIllness] = React.useState(false);
	const [notificationData, setNotificationData] = useState({
		jwt: jwt,
		ifMedicine: checkedMedicine,
		medicineName: "",
		illnessId: "",
		notificationFrequency: "",
		notDesc: "",
	});
	useEffect(() => {
		if (!pobrane) {
			getIllnessesByUser();
		}
	});
	const getIllnessesByUser = async () => {
		const response = await fetch(apiPaths.getIllnessesByUser, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
			body: JSON.stringify({
				jwt,
			}),
		});
		const content = await response.json();
		setIllnessData(content);
		setPobrane(true);
	};
	const addNotification = async () => {
		if (
			notificationData.notificationFrequency &&
			notificationData.notDesc &&
			jwt
		) {
			const response = await fetch(apiPaths.addNotification, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				credentials: "include",
				body: JSON.stringify({
					notificationData,
				}),
			});

			response
				? showSuccess(constans.messages.success)
				: showError(constans.messages.error);
		} else {
			showWarning(constans.messages.validate);
		}
	};

	const handleChangeMedicine = () => {
		setCheckedMedicine(!checkedMedicine);
	};
	const handleChangeIllness = () => {
		setCheckedIllness(!checkedIllness);
	};

	const fetchData = () => {
		if (pobrane) {
		} else {
		}
	};
	useEffect(() => {
		fetchData();
		if (notificationData?.notificationFrequency) {
		}
	});

	return (
		<div className="main-container home-container">
			<div className="wrapper app-wrapper-page">
				{jwt ? (
					<div>
						<div className="icon">
							<FcIcons.FcAlarmClock />
						</div>
						<Label className="title" value={constans.titles.notification} />
						<Label value={constans.notification.notificationHint} />
						<br />

						<input
							className="input-select"
							type="checkbox"
							checked={checkedMedicine}
							onChange={handleChangeMedicine}
						/>
						<Label value={constans.notification.isMedicine} />
						<br />
						{checkedMedicine ? (
							<div>
								<Label value={constans.actions.medicineForm} />
								<input
									className={"input"}
									type="text"
									onChange={(e) =>
										setNotificationData((prevState) => ({
											...prevState,
											medicineName: e.target.value,
										}))
									}
								/>
							</div>
						) : null}
						<input
							className="input-select"
							type="checkbox"
							checked={checkedIllness}
							onChange={handleChangeIllness}
						/>
						<Label value={constans.notification.isIllness} />
						<br />

						{checkedIllness ? (
							<div>
								<Label value={constans.actions.illnessForm} />
								<select
									className="input"
									onChange={(e) =>
										setNotificationData((prevState) => ({
											...prevState,
											illnessId: e.target.value,
										}))
									}
								>
									<option
										value={constans.actions.illnessForm}
										className="label-light"
									/>
									{}
									{illnessData.map((option) => (
										<option value={option.IllId}>{option.IllDesc}</option>
									))}
								</select>
							</div>
						) : null}
						<Label value={constans.notification.descriptionHint} />
						<input
							className="input"
							type="text"
							onChange={(e) =>
								setNotificationData((prevState) => ({
									...prevState,
									notDesc: e.target.value,
								}))
							}
						/>
						<Label value={constans.actions.hourForm} />
						<Select
							value={notificationHour.filter(
								(obj) => notificationData?.notificationFrequency == obj.label
							)}
							closeMenuOnSelect={true}
							options={notificationHour}
							onChange={(e) =>
								setNotificationData((prevState) => ({
									...prevState,
									notificationFrequency: e!.label,
								}))
							}
							className="input"
							menuPlacement="top"
							defaultValue={{ value: "8:00", label: "8:00" }}
						/>
						<Label value={constans.notification.addNotification} />
						<ActionButton
							value={constans.messages.add}
							className={"button"}
							onClick={addNotification}
						/>
					</div>
				) : (
					<p>{constans.messages.unauthorizedUser}</p>
				)}
			</div>
		</div>
	);
};

export default AddNotification;
