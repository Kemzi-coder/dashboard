import React from "react";
import PropTypes from "prop-types";
import Input from "../Input/Input";

const FormTextField = ({
	register,
	className,
	name,
	options,
	errors,
	...props
}) => (
	<div className="w-full">
		{errors[name] && (
			<label
				className="text-danger mb-2 block overflow-ellipsis overflow-hidden whitespace-nowrap"
				htmlFor={name}
			>
				{errors[name].message}
			</label>
		)}
		<Input
			id={name}
			isInvalid={!!errors[name] || !!errors.response}
			{...register(name, options)}
			{...props}
		/>
	</div>
);

FormTextField.propTypes = {
	register: PropTypes.func,
	className: PropTypes.string,
	name: PropTypes.string.isRequired,
	options: PropTypes.shape({}),
	errors: PropTypes.shape({response: PropTypes.shape({})})
};

FormTextField.defaultProps = {
	className: "",
	register: () => {},
	options: {},
	errors: {}
};

export default FormTextField;
