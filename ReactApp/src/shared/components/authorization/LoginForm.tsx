import axios, { AxiosResponse } from "axios";
import React, { useState, useEffect, FC, SyntheticEvent } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Header from "../../basicControls/Header";
import Cookies from "universal-cookie";
import { showError, showSuccess, showWarning } from "../toast/toastUtils";
import { apiPaths } from "../../../pages/services/api/apiPaths";

interface LoginFormProps {
	submitForm: React.ReactNode;
}

const LoginForm: FC<LoginFormProps> = (props: LoginFormProps) => {
	let navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const tryLogin = async (e: SyntheticEvent) => {
		e.preventDefault();

		if (!email || !password) {
			showWarning("Najpierw uzupełnij dane logowania!");
		} else {
			const response = await fetch(apiPaths.login, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				credentials: "include",
				body: JSON.stringify({
					email,
					password,
				}),
			});
			const content = await response.json();
			if (content.jwtToken) {
				const cookies = new Cookies();
				cookies.set("jwt", content.jwtToken);
				showSuccess("Zalogowano poprawnie");
				navigate("/home");
			} else {
				showError("Błąd autoryzacji");
			}
		}
	};

	return (
		<div className="login-container">
			<ToastContainer />

			<div className="app-wrapper">
				<Header />
				<h2 className="title">Logowanie</h2>
				<form className="form-wrapper">
					<input
						type="text"
						placeholder="login"
						className="input"
						onChange={(e) => setEmail(e.target.value)}
					/>
					<input
						type="password"
						placeholder="hasło"
						className="input"
						onChange={(e) => setPassword(e.target.value)}
					/>
					<div className="button-aligment">
						<button className="submit" onClick={tryLogin}>
							Zaloguj się
						</button>
						<Link to="/register" className="submit">
							Rejestracja
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
};

export default LoginForm;
