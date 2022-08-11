import classNames from "classnames";
import PropTypes from "prop-types";
import React, {forwardRef} from "react";

const Checkbox = forwardRef(({text, name, className, ...props}, ref) => (
	<label className={classNames(className, "cursor-pointer")} htmlFor={name}>
		<input
			ref={ref}
			id={name}
			name={name}
			className="hidden peer"
			type="checkbox"
			{...props}
		/>
		<span className="mb-2 inline-block text-lg">{text}</span>
		<span className="relative block peer-checked:before:translate-x-full peer-checked:before:bg-accent overflow-hidden w-14 h-7 border border-primaryLight rounded-2xl mr-2 before:absolute before:block before:w-1/2 before:h-full before:bg-primaryLight before:rounded-2xl before:left-0 before:top-0 before:transition-colors before:transition-transform" />
	</label>
));

Checkbox.propTypes = {
	text: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	className: PropTypes.string
};

Checkbox.defaultProps = {
	className: ""
};

export default Checkbox;
