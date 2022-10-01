import React, { Component, FC } from "react";
import HealthCheck from "../shared/components/questionnaire/HealthCheck";
import UserResponseDto from "./services/api/dto/UserResponseDto";

interface QuestionnaireProps {
	user: UserResponseDto | undefined;
}

const Questionnaire: FC<QuestionnaireProps> = (props: QuestionnaireProps) => {
	return <HealthCheck user={props.user} submitForm={undefined} />;
};
export default Questionnaire;
