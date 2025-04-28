import { useCartDispatch } from "../store/hooks";
import { addToCart } from "../store/cart-slice";
import { useState, useEffect, useRef } from "react";
import Modal from "../components/Modal";

type ProductProps = {
	id: string;
	title: string;
	price: number;
	image: string;
	description: string;
};

export default function Product({ id, title, price, image, description }: ProductProps) {
	const dispatch = useCartDispatch();
	const [isVisible, setIsVisible] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const ref = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold: 0.2 });

		if (ref.current) observer.observe(ref.current);
		return () => {
			if (ref.current) observer.unobserve(ref.current);
		};
	}, []);

	function handleAddToCart() {
		dispatch(addToCart({ id, title, price }));
	}

	function handleOpenModal() {
		setShowModal(true);
	}

	function handleCloseModal() {
		setShowModal(false);
	}

	return (
		<div ref={ref} className={`product ${isVisible ? "fade-in" : ""}`}>
			<img src={image} alt={title} onClick={handleOpenModal} />
			<div>
				<h3>{title}</h3>
				<p className="product-price">{price} تومان</p>
			</div>
			<p className="product-actions">
				<button onClick={handleAddToCart}>افزودن به سبد خرید</button>
			</p>

			{showModal && (
				<Modal onClose={handleCloseModal}>
					<img src={image} alt={title} className="modal-img" onClick={handleOpenModal} />
					<h2>{title}</h2>
					<p style={{ textAlign: "justify" }}>{description}</p>
					<div className="product-button">
						<button onClick={handleAddToCart} className="product-add">افزودن به سبد خرید</button>
						<button onClick={handleCloseModal}>بستن توضیحات</button>
					</div>
				</Modal>
			)}
		</div>
	);
}
