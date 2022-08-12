import React from "react";
import {Outlet} from "react-router-dom";
import MainLayout from "../../../components/MainLayout/MainLayout";
import MainBody from "../../../components/MainBody/MainBody";
import AccountsTabs from "../AccountsTabs/AccountsTabs";
import MainTopbar from "../../../components/MainTopbar/MainTopbar";

const AccountsPage = () => (
	<MainLayout>
		<MainTopbar>
			<AccountsTabs />
		</MainTopbar>
		<MainBody>
			<Outlet />
		</MainBody>
	</MainLayout>
);

export default AccountsPage;
