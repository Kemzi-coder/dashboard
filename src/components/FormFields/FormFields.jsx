import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

const FormFields = ({children, className, register, errors}) => (
	<div className={classNames(className, "flex flex-col gap-4")}>
		{React.Children.map(children, child =>
			child.props.name
				? React.cloneElement(child, {
						...child.props,
						register,
						errors,
						key: child.props.name
				  })
				: child
		)}
	</div>
);

FormFields.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
	register: PropTypes.func,
	errors: PropTypes.shape({response: PropTypes.shape({})})
};

FormFields.defaultProps = {
	register: () => {},
	className: "",
	errors: {}
};

export default FormFields;
