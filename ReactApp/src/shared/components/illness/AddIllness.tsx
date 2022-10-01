import { useState, useEffect, FC, SyntheticEvent } from "react";
import { constans } from "../../../_shared/constans";
import ActionButton from "../../basicControls/ActionButton";
import Label from "../../basicControls/Label";
import { IllnessTypes } from "../../../models/IllnessTypes";
import axios, { AxiosResponse } from "axios";
import { Illness } from "../../../models/Ilness";
import { useCookies } from "react-cookie";
import { showError, showSuccess, showWarning } from "../toast/toastUtils";
import { CustomIllness } from "../../../models/CustomIllness";
import Input from "../../basicControls/Input";
import { apiPaths } from "../../../pages/services/api/apiPaths";
interface AddIllnessProps {
	visible: boolean;
}

const AddIllness: FC<AddIllnessProps> = (props: AddIllnessProps) => {
	const [illnessTypesData, setIllnessTypesData] = useState<IllnessTypes[]>([]);
	const [illnessData, setIllnessData] = useState<Illness[]>([]);
	const [selectedIllType, setSelectedIllType] = useState("");
	const [selectedIllId, setSelectedIllId] = useState("");
	const [pobrane1, setPobrane1] = useState(false);
	const [cookies, setCookie] = useCookies();
	const [customIllness, setCustomIllness] = useState({
		illness: "",
		isSelected: false,
	});

	const optionsIllnessType = illnessTypesData;
	const optionsIllness = illnessData.filter(
		(x) => x.IllType.toString() == selectedIllType
	);
	const jwt = cookies.jwt;
	const reqOne = "";
	const reqTwo = "";
	const getIllTypes = () => {
		axios
			.get<IllnessTypes>(apiPaths.getIllTypes)
			.then((response: AxiosResponse) => {
				setIllnessTypesData(response.data);
			});
		setPobrane1(true);
	};
	const fetchData = () => {
		if (pobrane1) {
		} else {
			getIllTypes();
			getIll();
		}
	};
	const getIll = () => {
		axios.get<Illness>(apiPaths.getIllness).then((response: AxiosResponse) => {
			setIllnessData(response.data);
		});
	};
	function RemoveElementFromObjectArray(key: number) {
		illnessData.forEach((value, index) => {
			if (value.IllId == key) illnessData.splice(index, 1);
		});
	}
	const addIllness = async (e: SyntheticEvent) => {
		if (selectedIllId && jwt) {
			e.preventDefault();
			let response = await fetch(apiPaths.addIllness, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				credentials: "include",
				body: JSON.stringify({
					selectedIllId,
					jwt,
				}),
			});
			response.ok
				? showSuccess(constans.messages.success)
				: showError(constans.messages.error);
			setSelectedIllId("");
		} else if (customIllness.illness && jwt) {
			const illness = customIllness.illness;
			let response = await fetch(apiPaths.addCustomIllness, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				credentials: "include",
				body: JSON.stringify({
					selectedIllType,
					illness,
					jwt,
				}),
			});
			response.ok
				? showSuccess(constans.messages.success)
				: showError(constans.messages.error);
		} else {
			showWarning(constans.messages.validate);
		}
	};
	useEffect(() => {
		fetchData();
	});

	return props.visible ? (
		<div>
			<Label value={constans.configureProfil.illnessHint} />
			<select
				onChange={(e) => setSelectedIllType(e.target.value)}
				className="input"
			>
				<option value={"Wybierz kategorię"} className="label-light" />
				{}
				{optionsIllnessType.map((option) => (
					<option value={option.IllTypeId.toString()}>
						{option.IllTypeName}
					</option>
				))}
			</select>
			<select
				onChange={(e) => setSelectedIllId(e.target.value)}
				className="input"
			>
				<option value={"Wybierz dolegliwość"} className="label-light" />
				{}
				{optionsIllness.map((option) => (
					<option value={option.IllId}>{option.IllDesc}</option>
				))}
			</select>
			<input
				className="input-select"
				type="checkbox"
				checked={customIllness?.isSelected}
				onChange={(e) =>
					setCustomIllness((prevState) => ({
						...prevState,
						isSelected: !customIllness.isSelected,
					}))
				}
			/>
			<Label value={constans.configureProfil.customIllness}></Label>
			{customIllness.isSelected ? (
				<>
					<Label value={constans.actions.customIllnessForm} />
					<input
						className="input"
						type="text"
						onChange={(e) =>
							setCustomIllness((prevState) => ({
								...prevState,
								illness: e.target.value,
							}))
						}
					/>
				</>
			) : null}
			<br />
			<Label value={constans.configureProfil.addHint} />
			<ActionButton
				value={constans.messages.add}
				className={"button"}
				onClick={addIllness}
			/>
		</div>
	) : null;
};

export default AddIllness;
