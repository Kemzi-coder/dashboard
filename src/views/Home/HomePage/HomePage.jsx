import React, {useEffect} from "react";
import {Outlet} from "react-router-dom";
import MainLayout from "../../../components/MainLayout/MainLayout";
import Stats from "../../../store/stats";
import HomeTabs from "../HomeTabs/HomeTabs";

const HomePage = () => {
	useEffect(() => {
		Stats.fetchAll();
	}, []);

	return (
		<MainLayout>
			<HomeTabs />
			<div className="order-1 bg-primary container mx-auto py-8 px-16">
				<Outlet />
			</div>
		</MainLayout>
	);
};

export default HomePage;
