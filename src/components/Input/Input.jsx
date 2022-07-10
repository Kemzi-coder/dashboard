import React, {forwardRef} from "react";
import PropTypes, {bool} from "prop-types";
import classNames from "classnames";

const Input = forwardRef(({startIcon: Icon, isInvalid, ...props}, ref) => (
	<div className="relative flex items-center">
		<input
			ref={ref}
			className={classNames(
				"peer text-lg w-full rounded-2xl bg-transparent border-primaryLighter border py-2 pl-12 pr-4 text-white placeholder:text-primaryLight",
				{"border-danger": isInvalid}
			)}
			type="text"
			{...props}
		/>
		<Icon
			className="peer-focus:text-white transition-colors absolute left-4 text-primaryLight peer-focus:text-white peer"
			size={22}
		/>
	</div>
));

Input.propTypes = {
	startIcon: PropTypes.elementType.isRequired,
	isInvalid: bool
};

Input.defaultProps = {
	isInvalid: false
};

export default Input;
