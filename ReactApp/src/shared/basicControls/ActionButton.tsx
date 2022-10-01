import { FC } from "react";

interface ActionButtonProps {
	className: string;
	onClick: any;
	disabled?: boolean;
	value: string;
}

const defaultProps = {
	visible: true,
};

const ActionButton: FC<ActionButtonProps> = (props: ActionButtonProps) => {
	props = { ...defaultProps, ...props };
	let visible = true;
	return visible ? (
		<button type="submit" className={"submit"} onClick={props.onClick}>
			{props.value}
		</button>
	) : null;
};

export default ActionButton;
