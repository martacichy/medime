import { FC } from "react";
import { QuestionnaireResponseDto } from "../../pages/services/api/dto/QuestionnaireResponseDto";
import Form from "./Form";
interface QuestionnaireResultProps {
	questionnaireResult: QuestionnaireResponseDto;
}

const QuestionnaireResult: FC<QuestionnaireResultProps> = (
	props: QuestionnaireResultProps
) => {
	const item = props.questionnaireResult;
	return (
		<div className="">
			<div className="notification-content">
				<div className="notification-text">
					<label className="pill">{"Czułeś/aś się " + item.HealthLevel}</label>
					<Form
						label={"Zanotowane obserwacje: "}
						value={item.Description}
						visible={true}
					/>
					<Form
						label={"Towarzyszyły Ci objawy: "}
						value={item.Sympthoms}
						visible={item.Sympthoms != null}
					/>
					<Form
						label={"Wykonane pomiary: "}
						value={item.Parameters}
						visible={item.Parameters != null}
					/>
					<Form
						label={"Przyjęte leki: "}
						value={item.MedicineName}
						visible={item.MedicineName != null}
					/>
				</div>
			</div>
		</div>
	);
};

export default QuestionnaireResult;
