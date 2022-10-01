import { useState, useEffect, FC, SyntheticEvent } from "react";
import { constans } from "../../../_shared/constans";
import ActionButton from "../../basicControls/ActionButton";
import Label from "../../basicControls/Label";
import Header from "../../basicControls/Header";
import UserData from "../../../models/UserData";
import { NotificationResponseDto } from "../../../pages/services/api/dto/NotificationResponseDto";
import { useCookies } from "react-cookie";
import { QuestionnaireResponseDto } from "../../../pages/services/api/dto/QuestionnaireResponseDto";
import Select from "react-select";
import Questionnaire from "../../../pages/Questionnaire";
import QuestionnaireResult from "../../basicControls/QuestionnaireResult";
import ReactDOMServer from "react-dom/server";
import jsPDF from "jspdf";
import logo from "../../styles/images/logo.png";
import { Error } from "../../../pages/error/Error";
interface QuestionnaireHistoryProps {
	user: UserData | undefined;
	questionnaireHistory: QuestionnaireResponseDto[] | undefined;
}

const QuestionnaireHistory: FC<QuestionnaireHistoryProps> = (
	props: QuestionnaireHistoryProps
) => {
	const [avaliableDates, setAvaliableDates] = useState<string[]>([]);
	const [cookies, setCookie] = useCookies();
	const jwt = cookies.jwt;
	const [selectedItem, setSelectedItem] = useState<QuestionnaireResponseDto>();
	const data = props.questionnaireHistory;
	const downloadFile = () => {
		const Doc = <div></div>;
		const doc = new jsPDF();
		doc.setFontSize(18);
		doc.text("Twoja historia samopoczucia", 10, 10);
		doc.setFontSize(10);
		doc.text("Zapisano z aplikacji MediMe", 10, 20);
		doc.setFont("Montserrat");
		doc.setFontSize(14);
		doc.text("Data: " + selectedItem?.CreationDate, 10, 30);
		doc.text("Notatka: " + selectedItem!.Description, 10, 40);
		doc.text("Samopoczucie: " + selectedItem!.HealthLevel, 10, 50);
		doc.text("Leki: " + selectedItem!.MedicineName, 10, 60);
		doc.text("Objawy: " + selectedItem!.Sympthoms, 10, 70);
		var splitTitle = doc.splitTextToSize(selectedItem!.Parameters, 80);

		doc.text(splitTitle, 10, 80);

		doc.html(ReactDOMServer.renderToStaticMarkup(Doc), {
			callback: () => {
				doc.save("historia.pdf");
			},
		});
	};
	return (
		<>
			{jwt ? (
				<div>
					<br />
					<select
						onChange={(e) =>
							setSelectedItem(
								data!.filter((x) => x.Id.toString() == e.target.value)[0]
							)
						}
						className="input"
					>
						<option className="label-light" />
						{data?.map((option) => (
							<option value={option.Id}>{option.CreationDate}</option>
						))}
					</select>
					{selectedItem ? (
						<>
							<QuestionnaireResult questionnaireResult={selectedItem} />
						</>
					) : (
						<Label value="Wybierz datę" />
					)}
					{selectedItem ? (
						<ActionButton
							value={"Pobierz historię"}
							className={"button"}
							onClick={downloadFile}
						/>
					) : null}
				</div>
			) : (
				<Error />
			)}
		</>
	);
};

export default QuestionnaireHistory;
