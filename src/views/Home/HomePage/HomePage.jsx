import React, {useEffect} from "react";
import {Outlet} from "react-router-dom";
import MainLayout from "../../../components/MainLayout/MainLayout";
import MainBody from "../../../components/MainBody/MainBody";
import Stats from "../../../store/stats";

const HomePage = () => {
	useEffect(() => {
		Stats.fetchAll();
	}, []);

	return (
		<MainLayout>
			<div className="bg-primary px-16 space-x-8" />
			<MainBody>
				<Outlet />
			</MainBody>
		</MainLayout>
	);
};

export default HomePage;
