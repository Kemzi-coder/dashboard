import {observer} from "mobx-react-lite";
import React, {useLayoutEffect} from "react";
import {useForm} from "react-hook-form";
import Button from "../../../components/Button/Button";
import FormCheckboxField from "../../../components/FormCheckboxField/FormCheckboxField";
import FormFields from "../../../components/FormFields/FormFields";
import FormTextField from "../../../components/FormTextField/FormTextField";
import NotificationSettings from "../../../store/notificationSettings";
import {notificationSettingsFormValidation} from "../../../validation/settings";
import Divider from "../../../components/Divider/Divider";

const SettingsNotifications = observer(() => {
	const {
		handleSubmit,
		register,
		reset,
		formState: {errors, isSubmitting, dirtyFields, isValid}
	} = useForm({mode: "all"});
	const {settings, isLoading} = NotificationSettings;

	useLayoutEffect(() => {
		NotificationSettings.fetch();

		return () => NotificationSettings.setIsLoading(true);
	}, []);

	const onSubmit = async data => {
		await NotificationSettings.edit(data);
		reset(settings);
	};

	if (isLoading) {
		return "Loading...";
	}

	return (
		<>
			<h2 className="text-white text-4xl mb-6 font-semibold">
				Notifications settings
			</h2>
			<form className="max-w-sm" onSubmit={handleSubmit(onSubmit)}>
				<FormFields className="mb-4" register={register} errors={errors}>
					<FormCheckboxField
						defaultChecked={settings.telegram_notify}
						name="telegram_enable"
						text="Enable telegram notifications"
					/>
					<Divider />
					<FormTextField
						defaultValue={settings.telegram_id}
						placeholder="Telegram login"
						name="telegram_uuid"
						options={notificationSettingsFormValidation.telegram_uuid}
					/>
				</FormFields>
				<Button
					disabled={
						isSubmitting || Object.keys(dirtyFields).length === 0 || !isValid
					}
					type="submit"
				>
					Save
				</Button>
			</form>
		</>
	);
});

export default SettingsNotifications;
