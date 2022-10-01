import { FC } from "react";

interface FormProps {
	label: string;
	value: string;
	visible: boolean;
}

const Form: FC<FormProps> = (props: FormProps) => {
	return props.visible ? (
		<div className="form">
			<label className={"label bold"}>{props.label}</label>
			<label className={"label"}>{props.value}</label>
			<br />
		</div>
	) : null;
};

export default Form;
