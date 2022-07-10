import React, {useEffect} from "react";
import "./app.css";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter/AppRouter";
import Auth from "./store/auth";

const App = () => {
	useEffect(() => {
		if (localStorage.getItem("token")) {
			Auth.check();
		}
	}, []);

	return (
		<BrowserRouter>
			<AppRouter />
		</BrowserRouter>
	);
};

export default App;
