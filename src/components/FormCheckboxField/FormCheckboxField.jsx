import React from "react";
import PropTypes from "prop-types";
import Checkbox from "../Checkbox/Checkbox";

const FormCheckboxField = ({register, className, name, options, ...props}) => (
	<Checkbox {...register(name, options)} {...props} />
);

FormCheckboxField.propTypes = {
	register: PropTypes.func,
	className: PropTypes.string,
	name: PropTypes.string.isRequired,
	options: PropTypes.shape({}),
	errors: PropTypes.shape({response: PropTypes.shape({})})
};

FormCheckboxField.defaultProps = {
	className: "",
	register: () => {},
	options: {},
	errors: {}
};

export default FormCheckboxField;
