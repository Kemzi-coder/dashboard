import React from "react";
import {useForm} from "react-hook-form";
import Button from "../../../components/Button/Button";
import FormFields from "../../../components/FormFields/FormFields";
import Apps from "../../../store/apps";
import FormTextField from "../../../components/FormTextField/FormTextField";
import createFormValidation from "../../../validation/apps";

const AppsCreateForm = () => {
	const {
		handleSubmit,
		register,
		formState: {errors, isSubmitting}
	} = useForm({mode: "all"});

	const onSubmit = async data => {
		await Apps.create(data);
	};

	return (
		<>
			<h2 className="text-white text-4xl mb-4 font-semibold">Create app</h2>
			<form className="max-w-sm" onSubmit={handleSubmit(onSubmit)}>
				<FormFields className="mb-6" register={register} errors={errors}>
					<FormTextField
						placeholder="Name"
						name="app_name"
						options={createFormValidation.app_name}
					/>
					<FormTextField
						placeholder="Id"
						name="app_id"
						options={createFormValidation.app_id}
					/>
					<FormTextField
						placeholder="Hash"
						name="app_hash"
						options={createFormValidation.app_hash}
					/>
				</FormFields>
				<Button disabled={isSubmitting} type="submit">
					Create
				</Button>
			</form>
		</>
	);
};

export default AppsCreateForm;
