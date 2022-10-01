import { Link } from "react-router-dom";

export const Error = () => {
	return (
		<div>
			<p>Nie jesteś zalogowanym użytkownikiem!</p>;
			<div className="button-aligment">
				<Link to="/register" className="submit">
					Zarejestruj się
				</Link>
				<Link to="/" className="submit">
					Zaloguj się
				</Link>
			</div>
		</div>
	);
};
