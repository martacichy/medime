import { FC } from "react";

interface InputProps {
	value?: string;
	type?: string;
	className?: string;
	onChange?: Function;
	visible?: boolean;
}
const defaultProps = {
	visible: true,
	className: "input",
};
const Input: FC<InputProps> = (props: InputProps) => {
	props = { ...defaultProps, ...props };
	let visible = true;
	return props.visible ? (
		<input
			className={props.className}
			type={props.type}
			name={props.className}
			value={props.value}
		/>
	) : null;
};

export default Input;
