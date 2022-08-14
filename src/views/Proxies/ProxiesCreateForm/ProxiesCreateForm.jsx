import React from "react";
import {useForm} from "react-hook-form";
import Button from "../../../components/Button/Button";
import FormFields from "../../../components/FormFields/FormFields";
import proxies from "../../../store/proxies";
import FormTextField from "../../../components/FormTextField/FormTextField";
import createFormValidation from "../../../validation/proxies";

const ProxiesCreateForm = () => {
	const {
		handleSubmit,
		register,
		formState: {errors, isSubmitting}
	} = useForm({mode: "all"});

	const onSubmit = async data => {
		await proxies.create(data);
	};

	return (
		<>
			<h2 className="text-white text-4xl mb-4 font-semibold">Create proxy</h2>
			<form className="max-w-sm" onSubmit={handleSubmit(onSubmit)}>
				<FormFields className="mb-6" register={register} errors={errors}>
					<FormTextField
						placeholder="Type"
						name="proxy_type"
						options={createFormValidation.proxy_type}
					/>
					<FormTextField
						placeholder="Host"
						name="proxy_host"
						options={createFormValidation.proxy_host}
					/>
					<FormTextField
						placeholder="Port"
						name="proxy_port"
						options={createFormValidation.proxy_port}
					/>
					<FormTextField placeholder="Username" name="proxy_username" />
					<FormTextField
						placeholder="Password"
						name="proxy_password"
						type="password"
					/>
				</FormFields>
				<Button disabled={isSubmitting} type="submit">
					Create
				</Button>
			</form>
		</>
	);
};

export default ProxiesCreateForm;
