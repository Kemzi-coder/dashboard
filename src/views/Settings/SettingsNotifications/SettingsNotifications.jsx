import {observer} from "mobx-react-lite";
import React, {useEffect} from "react";
import {useForm} from "react-hook-form";
import {autorun} from "mobx";
import Button from "../../../components/Button/Button";
import FormCheckboxField from "../../../components/FormCheckboxField/FormCheckboxField";
import FormFields from "../../../components/FormFields/FormFields";
import FormTextField from "../../../components/FormTextField/FormTextField";
import settingsState from "../../../store/settings";
import {notificationSettingsFormValidation} from "../../../validation/settings";
import Divider from "../../../components/Divider/Divider";

const SettingsNotifications = observer(() => {
	const {
		handleSubmit,
		register,
		reset,
		formState: {errors, isSubmitting, dirtyFields, isValid}
	} = useForm({mode: "all"});

	useEffect(() => () => settingsState.clear(), []);

	useEffect(() => autorun(() => settingsState.loadNotification()), []);

	const onSubmit = async data => {
		await settingsState.editNotification(data);
		reset(settingsState.settings);
	};

	if (settingsState.isLoading) {
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
						defaultChecked={settingsState.settings.telegram_notify}
						name="telegram_enable"
						text="Enable telegram notifications"
					/>
					<Divider />
					<FormTextField
						defaultValue={settingsState.settings.telegram_id}
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
