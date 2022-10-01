import React, {
	useState,
	useEffect,
	FC,
	Children,
	Dispatch,
	SetStateAction,
} from "react";
import Select from "react-select";
import { constans } from "../../_shared/constans";
import logo from "./../../styles/images/logo.png";
import ActionButton from "../basicControls/ActionButton";
import Label from "../basicControls/Label";

interface NextStepProps {
	visible: boolean;
	onClick: void;
}

const NextStep: FC<NextStepProps> = (props: NextStepProps) => {
	const [childrenVisible, setChildrenVisible] = useState(false);

	return props.visible ? (
		<div>
			<Label value={constans.configureProfil.nextHint} />
			<ActionButton
				value={constans.messages.next}
				className={""}
				onClick={props.onClick}
			/>
		</div>
	) : null;
};

export default NextStep;
