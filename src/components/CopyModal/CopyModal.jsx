import classNames from "classnames";
import PropTypes from "prop-types";
import React, {forwardRef, useEffect, useRef} from "react";

const CopyModal = forwardRef(({isCopied, setIsCopied, delay}, ref) => {
	const timer = useRef(null);

	useEffect(() => {
		timer.current = setTimeout(() => setIsCopied(false), delay);

		return () => clearTimeout(timer.current);
	}, [delay, setIsCopied, isCopied]);

	return (
		<div
			ref={ref}
			className={classNames(
				"absolute text-success z-10 bg-primary-light border-2 border-primary-lighter py-1 px-2 rounded-base opacity-0 transition-opacity",
				{"opacity-100": isCopied}
			)}
		>
			Copied.
		</div>
	);
});

CopyModal.propTypes = {
	isCopied: PropTypes.bool.isRequired,
	setIsCopied: PropTypes.func.isRequired,
	delay: PropTypes.number
};

CopyModal.defaultProps = {
	delay: 3000
};

export default CopyModal;
