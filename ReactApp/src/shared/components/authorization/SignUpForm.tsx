import React, { useState, useEffect, FC, SyntheticEvent } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { constans } from "../../../_shared/constans";
import ActionButton from "../../basicControls/ActionButton";
import Label from "../../basicControls/Label";
import Header from "../../basicControls/Header";
import { showError, showSuccess, showWarning } from "../toast/toastUtils";
import { apiPaths } from "../../../pages/services/api/apiPaths";

interface SignUpFormProps {
	submitForm: React.ReactNode;
}

const SignUpForm: FC<SignUpFormProps> = (props: SignUpFormProps) => {
	// const { handleChange, handleFormSubmit, values, errors } =
	//     useForm(submitForm);
	//return <p></p>
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [lastName, setLastName] = useState("");
	const [birthDate, setBirthDate] = useState("");
	const [password, setPassword] = useState("");
	const [redirect, setRedirect] = useState(false);
	let navigate = useNavigate();
	const tryRegister = async (e: SyntheticEvent) => {
		if (!email || !name || !lastName || !birthDate || !password) {
			showWarning("Uzupełnij wszystkie dane!");
		} else {
			e.preventDefault();
			let response = await fetch(apiPaths.register, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				credentials: "include",
				body: JSON.stringify({
					name,
					lastName,
					birthDate,
					email,
					password,
				}),
			});
			response.ok
				? showSuccess(constans.messages.registerResponse)
				: showError(constans.messages.error);
		}
	};
	if (redirect) {
		return <Navigate to="/" replace />;
	}
	return (
		<div className="login-container">
			<div className="app-wrapper">
				<Header />
				<Label className="title" value={constans.messages.register} />
				<Label value="Imię" />
				<input
					type="text"
					className="input"
					onChange={(e) => setName(e.target.value)}
				/>

				<Label value="Nazwisko" />
				<input
					type="text"
					className="input"
					onChange={(e) => setLastName(e.target.value)}
				/>
				<Label value="Data urodzenia" />
				<input
					type="date"
					className="input"
					onChange={(e) => setBirthDate(e.target.value)}
				/>
				<Label value="Login" />
				<input
					type="text"
					className="input"
					onChange={(e) => setEmail(e.target.value)}
				/>
				<Label value="Hasło" />
				<input
					type="password"
					className="input"
					onChange={(e) => setPassword(e.target.value)}
				/>
				<div className="button-aligment">
					<ActionButton
						className="submit"
						onClick={tryRegister}
						value={constans.messages.register}
					/>
					<Link to="/" className="submit">
						{constans.actions.naivigateToLogin}
					</Link>
				</div>
			</div>
		</div>
	);
};

export default SignUpForm;
