import React, {useEffect} from "react";
import "./app.css";
import {BrowserRouter} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {autorun} from "mobx";
import AppRouter from "./components/AppRouter/AppRouter";
import authState from "./store/auth";

const App = observer(() => {
	useEffect(
		() =>
			autorun(() => {
				if (localStorage.getItem("token")) {
					authState.check();
				} else {
					authState.setIsLoading(false);
				}
			}),
		[]
	);

	if (authState.isLoading) {
		return "Loading...";
	}

	return (
		<BrowserRouter>
			<div className="bg-primary">
				<AppRouter />
			</div>
		</BrowserRouter>
	);
});

export default App;
