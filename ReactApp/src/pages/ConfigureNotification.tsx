import React, { Component, FC, useState } from "react";
import UserData from "../models/UserData";
import AddNotification from "../shared/components/notification/AddNotification";
import UserResponseDto from "./services/api/dto/UserResponseDto";

interface CofigureNotificationProps {
	user?: UserResponseDto;
}

const CofigureNotification: FC<CofigureNotificationProps> = (
	props: CofigureNotificationProps
) => {
	return <AddNotification user={props.user} />;
};
export default CofigureNotification;
