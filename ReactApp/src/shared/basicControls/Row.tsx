import { FC } from "react";
import Input from "./Input";
import Label from "./Label";

interface RowProps {
	className: string;
	labelValue: string;
	onChange?: Function;
}

const Row: FC<RowProps> = (props: RowProps) => {
	return (
		<div className={props.className}>
			<Label value={props.labelValue} />
			<Input
				type={props.className}
				className={props.className}
				onChange={props.onChange}
			/>
		</div>
	);
};

export default Row;
