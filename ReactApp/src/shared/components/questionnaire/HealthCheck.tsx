import React, { useState, FC } from "react";
import Select from "react-select";
import Label from "../../basicControls/Label";
import makeAnimated from "react-select/animated";
import ActionButton from "../../basicControls/ActionButton";
import { QuestionnaireData } from "../../../models/QuestionnaireData";
import { healthLevel } from "../../../_shared/healtCheckData";
import { sympthoms } from "../../../_shared/sympthomsData";
import { useCookies } from "react-cookie";
import { constans } from "../../../_shared/constans";
import { showError, showSuccess } from "../toast/toastUtils";
import UserResponseDto from "../../../pages/services/api/dto/UserResponseDto";
import Header from "../../basicControls/Header";
import * as FcIcons from "react-icons/fc";
import { apiPaths } from "../../../pages/services/api/apiPaths";

interface HealthCheckProps {
	submitForm: React.ReactNode;
	user?: UserResponseDto;
}

const animatedComponents = makeAnimated();

const HealthCheck: FC<HealthCheckProps> = (props: HealthCheckProps) => {
	const [cookies, setCookies] = useCookies();
	const [visibleInputs, setVisibleInputs] = useState({
		checkedMedicine: false,
		checkedSympthoms: false,
		checkedMeasurement: false,
	});
	const [questionnaireData, setQuestionnaireData] = useState<QuestionnaireData>(
		{
			jwt: cookies.jwt,
			healthLevel: "Dobrze",
			description: "",
			sympthoms: [],
			medicineName: "",
			temperature: "",
			bloodPressure: "",
			saturation: "",
			pulse: "",
		}
	);

	const addQuestionnaireResponse = async () => {
		const response = await fetch(apiPaths.addQuestionnaireResponse, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
			body: JSON.stringify({
				questionnaireData,
			}),
		});
		response.ok
			? showSuccess(constans.messages.success)
			: showError(constans.messages.error);
	};

	return (
		<div className="main-container home-container">
			<div className="wrapper app-wrapper-page">
				<div>
					<div className="icon">
						<FcIcons.FcCloseUpMode />
					</div>
					<h2 className="title">
						{props.user?.UsFirstName + constans.questionnaire.title}
					</h2>
				</div>
				<Label className="label" value={constans.questionnaire.healthLevel} />
				<Select
					value={healthLevel.filter((obj) =>
						questionnaireData?.healthLevel.includes(obj.label)
					)}
					closeMenuOnSelect={true}
					options={healthLevel}
					onChange={(e) =>
						setQuestionnaireData((prevState) => ({
							...prevState,
							healthLevel: e!.label,
						}))
					}
					className="input"
				/>
				<input
					className="input-select"
					type="checkbox"
					checked={visibleInputs.checkedSympthoms}
					onChange={(e) =>
						setVisibleInputs((prevState) => ({
							...prevState,
							checkedSympthoms: !visibleInputs.checkedSympthoms,
						}))
					}
				/>
				<Label value={constans.questionnaire.areSympthoms} className="label" />
				<br />
				{visibleInputs.checkedSympthoms ? (
					<>
						<Label className="label" value={constans.actions.checkSympthoms} />
						<Select
							value={sympthoms.filter((obj) =>
								questionnaireData?.sympthoms.includes(obj.label)
							)}
							closeMenuOnSelect={false}
							isMulti
							options={sympthoms}
							onChange={(e) =>
								setQuestionnaireData((prevState) => ({
									...prevState,
									sympthoms: Array.isArray(e) ? e.map((x) => x.label) : [],
								}))
							}
							className="input"
						/>
					</>
				) : null}
				<input
					className="input-select"
					type="checkbox"
					checked={visibleInputs.checkedMedicine}
					onChange={(e) =>
						setVisibleInputs((prevState) => ({
							...prevState,
							checkedMedicine: !visibleInputs.checkedMedicine,
						}))
					}
				/>
				<Label className="label" value={constans.questionnaire.isMedicine} />
				<br />
				{visibleInputs.checkedMedicine ? (
					<div>
						<Label value={constans.actions.medicineForm} />
						<input
							className={"input"}
							type="text"
							onChange={(e) =>
								setQuestionnaireData((prevState) => ({
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
					checked={visibleInputs.checkedMeasurement}
					onChange={(e) =>
						setVisibleInputs((prevState) => ({
							...prevState,
							checkedMeasurement: !visibleInputs.checkedMeasurement,
						}))
					}
				/>
				<Label className="label" value={constans.questionnaire.isMeasurement} />
				<br />
				{visibleInputs.checkedMeasurement ? (
					<div>
						<Label value={constans.actions.temperatureForm} />
						<input
							className={"input"}
							type="text"
							onChange={(e) =>
								setQuestionnaireData((prevState) => ({
									...prevState,
									temperature: e.target.value,
								}))
							}
						/>
						<Label value={constans.actions.bloodPressureForm} />
						<input
							className={"input"}
							type="text"
							onChange={(e) =>
								setQuestionnaireData((prevState) => ({
									...prevState,
									bloodPressure: e.target.value,
								}))
							}
						/>
						<Label value={constans.actions.saturationForm} />
						<input
							className={"input"}
							type="text"
							onChange={(e) =>
								setQuestionnaireData((prevState) => ({
									...prevState,
									saturation: e.target.value,
								}))
							}
						/>
						<Label value={constans.actions.pulseForm} />
						<input
							className={"input"}
							type="text"
							onChange={(e) =>
								setQuestionnaireData((prevState) => ({
									...prevState,
									pulse: e.target.value,
								}))
							}
						/>
					</div>
				) : null}
				<Label value={constans.questionnaire.descriptionHint} />
				<input
					className={"input"}
					type="text"
					onChange={(e) =>
						setQuestionnaireData((prevState) => ({
							...prevState,
							description: e.target.value,
						}))
					}
				/>
				<ActionButton
					onClick={addQuestionnaireResponse}
					className={"submit"}
					value={constans.messages.add}
				/>
			</div>
		</div>
	);
};
export default HealthCheck;
