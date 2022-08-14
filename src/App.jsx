import React, {useEffect} from "react";
import "./app.css";
import {BrowserRouter} from "react-router-dom";
import {observer} from "mobx-react-lite";
import AppRouter from "./components/AppRouter/AppRouter";
import auth from "./store/auth";

const App = observer(() => {
	useEffect(() => {
		if (localStorage.getItem("token")) {
			auth.check();
		} else {
			auth.setIsLoading(false);
		}
	}, []);

	if (auth.isLoading) {
		return "Loading...";
	}

	return (
		<BrowserRouter>
			<AppRouter />
		</BrowserRouter>
	);
});

export default App;
