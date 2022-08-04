import React, {useEffect} from "react";
import "./app.css";
import {BrowserRouter} from "react-router-dom";
import {observer} from "mobx-react-lite";
import AppRouter from "./components/AppRouter/AppRouter";
import Auth from "./store/auth";

const App = observer(() => {
	const {isLoading} = Auth;

	useEffect(() => {
		if (localStorage.getItem("token")) {
			Auth.check();
		}
	}, []);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<BrowserRouter>
			<AppRouter />
		</BrowserRouter>
	);
});

export default App;
