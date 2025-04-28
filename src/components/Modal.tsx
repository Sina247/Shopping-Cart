import React, { ReactNode, useEffect } from "react";
import ReactDOM from "react-dom";
import "../index.css";

type ModalProps = {
	children: ReactNode;
	onClose: () => void;
};

const Modal = ({ children, onClose }: ModalProps) => {
	useEffect(() => {
		const onEsc = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
		};
		document.addEventListener("keydown", onEsc);
		return () => {
			document.removeEventListener("keydown", onEsc);
		};
	}, [onClose]);

	const handleModalClick = (e: React.MouseEvent) => {
		e.stopPropagation();
	};

	const modalContent = (
		<div className="modal-overlay" onClick={onClose}>
			<div className="modal" onClick={handleModalClick}>
				{children}
			</div>
		</div>
	);

	return ReactDOM.createPortal(modalContent, document.body);
};

export default Modal;
