import { FC } from "react";

interface LabelProps {
	value: string;
	className?: string;
	visible?: boolean;
}
const defaultProps = {
	visible: true,
};
const Label: FC<LabelProps> = (props: LabelProps) => {
	let className = "label";
	props = { ...defaultProps, ...props };
	let visible = true;
	if (props.className) {
		className = props.className;
	}
	return props.visible ? (
		<label className={className}>{props.value}</label>
	) : null;
};

export default Label;
