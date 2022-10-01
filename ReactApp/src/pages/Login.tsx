import React, { Component, FC } from "react";
import LoginForm from "../shared/components/authorization/LoginForm";

interface LoginProps {}

const Login: FC<LoginProps> = () => {
	return <LoginForm submitForm={undefined} />;
};
export default Login;
