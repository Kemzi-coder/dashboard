import React from "react";
import {Outlet} from "react-router-dom";
import MainLayout from "../../../components/MainLayout/MainLayout";
import MainBody from "../../../components/MainBody/MainBody";
import AccountsTabs from "../AccountsTabs/AccountsTabs";

const AccountsPage = () => (
	<MainLayout>
		<AccountsTabs />
		<MainBody>
			<Outlet />
		</MainBody>
	</MainLayout>
);

export default AccountsPage;
