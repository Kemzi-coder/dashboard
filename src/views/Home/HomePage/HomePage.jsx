import React from "react";
import {Outlet} from "react-router-dom";
import MainLayout from "../../../components/MainLayout/MainLayout";
import MainBody from "../../../components/MainBody/MainBody";
import MainTopbar from "../../../components/MainTopbar/MainTopbar";

const HomePage = () => (
	<MainLayout>
		<MainTopbar />
		<MainBody>
			<Outlet />
		</MainBody>
	</MainLayout>
);

export default HomePage;
