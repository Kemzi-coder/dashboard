import React, {useRef, useState} from "react";
import {useForm} from "react-hook-form";
import {observer} from "mobx-react-lite";
import Button from "../../../components/Button/Button";
import FormFields from "../../../components/FormFields/FormFields";
import FormTextField from "../../../components/FormTextField/FormTextField";
import {profileSettingsFormValidation} from "../../../validation/settings";
import authState from "../../../store/auth";
import Avatar from "../../../components/Avatar/Avatar";

const SettingsProfileForm = observer(() => {
	const hiddenInputRef = useRef(null);
	const [requests, setRequests] = useState([]);
	const {
		handleSubmit,
		register,
		setError,
		watch,
		setValue,
		formState: {errors, isSubmitting, dirtyFields}
	} = useForm({mode: "all"});

	const onSubmit = async data => {
		if (dirtyFields.username) {
			setRequests([
				...requests,
				authState.changeUsername(data.username, setError)
			]);
		}

		if (dirtyFields.old_password && dirtyFields.new_password) {
			setRequests([
				...requests,
				authState.changePassword(data.old_password, data.new_password, setError)
			]);
		}

		if (dirtyFields.avatar_url) {
			setRequests([...requests, authState.uploadAvatar(data.avatar_file)]);
		}

		await Promise.all(requests);

		setRequests([]);
	};

	const handleChange = e => {
		const file = e.target.files[0];
		const objectUrl = URL.createObjectURL(file);

		setValue("avatar_url", objectUrl, {shouldDirty: true});
		setValue("avatar_file", file);
	};

	const handleClick = () => hiddenInputRef.current.click();

	return (
		<>
			<h2 className="text-white text-4xl mb-6 font-semibold">
				Profile settings
			</h2>
			<div className="flex">
				<form className="max-w-sm mr-16" onSubmit={handleSubmit(onSubmit)}>
					<FormFields className="mb-6" register={register} errors={errors}>
						<FormTextField
							defaultValue={authState.user.username}
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
				<div className="flex flex-col items-center">
					<input
						ref={hiddenInputRef}
						onChange={handleChange}
						type="file"
						hidden
					/>
					<Avatar
						className="mb-4"
						width={80}
						height={80}
						imagePath={watch("avatar_url") || authState.user.avatar}
						username={authState.user.username}
					/>
					<Button onClick={handleClick} size="medium">
						Upload photo
					</Button>
				</div>
			</div>
		</>
	);
});

export default SettingsProfileForm;
