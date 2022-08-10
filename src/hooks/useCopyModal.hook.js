import {useCallback, useState} from "react";

const useCopyModal = modalRef => {
	const [isCopied, setIsCopied] = useState(false);

	const handleClick = useCallback(
		e => {
			navigator.clipboard.writeText(e.target.textContent);

			modalRef.current.style.top = `${e.clientY}px`;
			modalRef.current.style.left = `${e.clientX}px`;
			setIsCopied(true);
		},
		[modalRef]
	);

	return {handleClick, isCopied, setIsCopied};
};

export default useCopyModal;
