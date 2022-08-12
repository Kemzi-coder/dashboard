import React, {useEffect} from "react";
import {Outlet} from "react-router-dom";
import MainLayout from "../../../components/MainLayout/MainLayout";
import MainBody from "../../../components/MainBody/MainBody";
import Stats from "../../../store/stats";
import MainTopbar from "../../../components/MainTopbar/MainTopbar";

const HomePage = () => {
	useEffect(() => {
		Stats.fetchAll();
	}, []);

	return (
		<MainLayout>
			<MainTopbar />
			<MainBody>
				<Outlet />
			</MainBody>
		</MainLayout>
	);
};

export default HomePage;
