import { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { ToastContainer } from "./shared/components/toast/ToastContainer";
import PageTemplate from "./shared/components/PageTemplate";
import { apiPaths } from "./pages/services/api/apiPaths";

function App() {
	const [cookies] = useCookies();
	const jwt = cookies.jwt;
	const [user, setUser] = useState();
	const [loaded, setLoaded] = useState(false);
	const getUser = async () => {
		const response = await fetch(apiPaths.getUser, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
			body: JSON.stringify({
				jwt,
			}),
		});
		const content = await response.json();

		setUser(content);
		setLoaded(true);
	};
	useEffect(() => {
		if (!user) {
			getUser();
		}
	});
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/register" element={<Register />} />
					<Route
						path="/"
						element={
							user ? <PageTemplate page={"home"} user={user} /> : <Login />
						}
					/>
					<Route
						path="/home"
						element={<PageTemplate page={"home"} user={user} />}
					/>
					<Route
						path="/questionnaire"
						element={<PageTemplate page={"questionnaire"} user={user} />}
					/>
					<Route
						path="/illness"
						element={<PageTemplate page={"illness"} user={user} />}
					/>
					<Route
						path="/notification"
						element={<PageTemplate page={"notification"} user={user} />}
					/>
					<Route
						path="/notificationdelete"
						element={<PageTemplate page={"notificationdelete"} user={user} />}
					/>
				</Routes>
				<ToastContainer />
			</BrowserRouter>
			<ToastContainer />
		</>
	);
}
export default App;
