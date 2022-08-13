import React from "react";
import {useForm} from "react-hook-form";
import {NavLink, useNavigate} from "react-router-dom";
import {MdPassword, MdPerson} from "react-icons/md";
import {LOGIN_ROUTE} from "../../../utils/constants/routes";
import FormFields from "../../../components/FormFields/FormFields";
import FormTextField from "../../../components/FormTextField/FormTextField";
import Button from "../../../components/Button/Button";
import Auth from "../../../store/auth";
import authFormValidation from "../../../validation/auth";

const AuthRegisterForm = () => {
	const navigate = useNavigate();
	const {
		handleSubmit,
		clearErrors,
		setError,
		formState: {errors, isSubmitting},
		register
	} = useForm({mode: "all"});

	const redirectToLoginForm = () => navigate(LOGIN_ROUTE);

	const onSubmit = async data => {
		await Auth.register(data, setError, redirectToLoginForm);
	};

	const handleClick = () => clearErrors("response");

	return (
		<>
			<h1 className="text-text-light text-5xl text-center mb-4 font-semibold">
				Register
			</h1>
			<NavLink
				className="text-text-dark mb-6 block text-center"
				to={LOGIN_ROUTE}
			>
				Already have an account?
			</NavLink>
			<form className="w-80" onSubmit={handleSubmit(onSubmit)}>
				<FormFields register={register} errors={errors}>
					<FormTextField
						startIcon={MdPerson}
						placeholder="Username"
						name="username"
						options={authFormValidation.username}
					/>
					<FormTextField
						startIcon={MdPassword}
						placeholder="Password"
						name="password"
						type="password"
						options={authFormValidation.password}
					/>
				</FormFields>
				{errors.response && (
					<p className="text-danger block overflow-ellipsis overflow-hidden whitespace-nowrap mt-2">
						{errors.response.message}
					</p>
				)}
				<Button
					onClick={handleClick}
					disabled={isSubmitting}
					type="submit"
					className="w-full mt-6"
				>
					Register
				</Button>
			</form>
		</>
	);
};

export default AuthRegisterForm;
