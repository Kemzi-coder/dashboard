import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import AuthLoginForm from "../AuthLoginForm/AuthLoginForm";
import AuthRegisterForm from "../AuthRegisterForm/AuthRegisterForm";
import {LOGIN_ROUTE} from "../../../utils/constants/routes";

const AuthPage = () => {
	const [isLogin, setIsLogin] = useState(true);
	const location = useLocation();

	useEffect(() => {
		if (location.pathname === LOGIN_ROUTE) {
			setIsLogin(true);
		} else {
			setIsLogin(false);
		}
	}, [isLogin, location.pathname]);

	return (
		<div className="flex justify-center items-center flex-col bg-primary h-screen w-full">
			{isLogin ? <AuthLoginForm /> : <AuthRegisterForm />}
		</div>
	);
};

export default AuthPage;
