import React, {forwardRef} from "react";
import PropTypes, {bool} from "prop-types";
import classNames from "classnames";

const Input = forwardRef(
	({className, startIcon: Icon, isInvalid, ...props}, ref) => (
		<div className={classNames(className, "relative flex items-center")}>
			<input
				ref={ref}
				className={classNames(
					"peer text-lg w-full transition-colors rounded-base bg-primary-light border py-2 text-text-light placeholder:text-text-darker",
					{
						"border-danger": isInvalid,
						"border-transparent": !isInvalid,
						"pl-12 pr-4": !!Icon,
						"px-4 peer": !Icon
					}
				)}
				type="text"
				{...props}
			/>
			{Icon && (
				<Icon
					className="peer-focus:text-text-dark transition-colors absolute left-4 text-text-darker"
					size={22}
				/>
			)}
		</div>
	)
);

Input.propTypes = {
	startIcon: PropTypes.elementType,
	isInvalid: bool,
	className: PropTypes.string
};

Input.defaultProps = {
	startIcon: null,
	isInvalid: false,
	className: ""
};

export default Input;
