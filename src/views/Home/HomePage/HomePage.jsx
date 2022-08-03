import React from "react";
import HomeTabs from "../HomeTabs/HomeTabs";
import HomeStats from "../HomeStats/HomeStats";
import MainLayout from "../../../components/MainLayout/MainLayout";

const HomePage = () => (
	<MainLayout>
		<HomeTabs />
		<div className="order-1 bg-primary container mx-auto py-8 px-16">
			<h2 className="text-4xl font-semibold mb-8">Home</h2>
			<HomeStats />
		</div>
	</MainLayout>
);

export default HomePage;
