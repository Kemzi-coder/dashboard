import React from "react";
import {useForm} from "react-hook-form";
import {observer} from "mobx-react-lite";
import Button from "../../../components/Button/Button";
import FormFields from "../../../components/FormFields/FormFields";
import FormTextField from "../../../components/FormTextField/FormTextField";
import {profileSettingsFormValidation} from "../../../validation/settings";
import Auth from "../../../store/auth";

const SettingsProfileForm = observer(() => {
	const {
		handleSubmit,
		register,
		setError,
		formState: {errors, isSubmitting, dirtyFields}
	} = useForm({mode: "all"});
	const {
		user: {username}
	} = Auth;

	const onSubmit = async data => {
		const requests = [];

		if (dirtyFields.username) {
			requests.push(Auth.changeUsername(data.username, setError));
		}

		if (dirtyFields.old_password && dirtyFields.new_password) {
			requests.push(
				Auth.changePassword(data.old_password, data.new_password, setError)
			);
		}

		await Promise.all(requests);
	};

	return (
		<>
			<h2 className="text-white text-4xl mb-4 font-semibold">
				Profile settings
			</h2>
			<form className="max-w-sm" onSubmit={handleSubmit(onSubmit)}>
				<FormFields className="mb-6" register={register} errors={errors}>
					<FormTextField
						defaultValue={username}
						placeholder="Username"
						name="username"
						options={profileSettingsFormValidation.username}
					/>
					<FormTextField
						placeholder="Old Password"
						type="password"
						name="old_password"
						options={profileSettingsFormValidation.old_password}
					/>
					<FormTextField
						placeholder="New Password"
						type="password"
						name="new_password"
						options={profileSettingsFormValidation.new_password}
					/>
				</FormFields>
				<Button
					disabled={isSubmitting || Object.keys(dirtyFields).length === 0}
					type="submit"
				>
					Save
				</Button>
			</form>
		</>
	);
});

export default SettingsProfileForm;
