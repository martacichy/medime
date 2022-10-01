import { Children, FC } from "react";

interface ErrorPageProps {}

const Panel: FC<ErrorPageProps> = (props: ErrorPageProps) => {
	return (
		<div className="panel">
			<label className="panel-title">
				Nie jesteś zalogowanym użytkownikiem.
			</label>
		</div>
	);
};

export default Panel;
