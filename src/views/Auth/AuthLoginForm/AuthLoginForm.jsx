import React from "react";
import {useForm} from "react-hook-form";
import {NavLink} from "react-router-dom";
import {MdPassword, MdPerson} from "react-icons/md";
import Button from "../../../components/Button/Button";
import FormTextField from "../../../components/FormTextField/FormTextField";
import FormFields from "../../../components/FormFields/FormFields";
import {REGISTER_ROUTE} from "../../../utils/constants/routes";
import authState from "../../../store/auth";
import authFormValidation from "../../../validation/auth";

const AuthLoginForm = () => {
	const {
		handleSubmit,
		setError,
		clearErrors,
		formState: {errors, isSubmitting},
		register
	} = useForm({mode: "all"});

	const onSubmit = async data => {
		await authState.login(data, setError);
	};

	const handleClick = () => clearErrors("response");

	return (
		<>
			<h1 className="text-text-light text-5xl text-center mb-4 font-semibold">
				Login
			</h1>
			<NavLink
				className="text-text-dark mb-6 block text-center"
				to={REGISTER_ROUTE}
			>
				Don&apos;t have an account?
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
					Login
				</Button>
			</form>
		</>
	);
};

export default AuthLoginForm;
