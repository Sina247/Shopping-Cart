import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Cart from "./Cart";
import "../index.css";

export default function Navbar() {
	const [cartIsOpen, setCartIsOpen] = useState(false);
	const [darkMode, setDarkMode] = useState(false);
	const [isVisible, setIsVisible] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);
	const navbarRef = useRef<HTMLDivElement | null>(null);

	const cartItemCount = useSelector((state: any) => state.cart.items.length);

	function handleOpenCart() {
		setCartIsOpen(true);
	}

	function handleCloseCart() {
		setCartIsOpen(false);
	}

	useEffect(() => {
		document.body.classList.toggle("dark-mode", darkMode);
	}, [darkMode]);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				setIsVisible(entry.isIntersecting);
			},
			{ threshold: 0.2 }
		);

		if (navbarRef.current) observer.observe(navbarRef.current);

		return () => {
			if (navbarRef.current) observer.unobserve(navbarRef.current);
		};
	}, []);

	return (
		<>
			{cartIsOpen && <Cart onClose={handleCloseCart} />}
			<div className={`offcanvas-menu ${menuOpen ? "open" : ""}`}>
				<button className="close-btn" onClick={() => setMenuOpen(false)}>
					<svg className="close-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
						<path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
					</svg>
				</button>
				<nav>
					<a href="#">محصولات ارگانیک</a>
					<a href="#">پر فروش‌ ترین‌ ها</a>
					<a href="#">تخفیف‌ های امروز</a>
					<a href="#">مشاهده سبد خرید</a>
					<a href="#">پیگیری سفارش</a>
					<a href="#">تسویه حساب</a>
					<a href="#">ورود به حساب کاربری</a>
				</nav>

				<input type="text" className="search-box" placeholder="جستجو محصولات" />
			</div>

			<div ref={navbarRef} className={`navbar ${isVisible ? "fade-in" : ""}`}>
				<button className="menu-btn" onClick={() => setMenuOpen(true)}>
					<svg className="shop-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
						<path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z" />
					</svg>
				</button>

				<div>
					<button className="shop-box">
						<svg className="shop-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
							<path d="M272 96a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm-90.7 12.6c-14-3.5-28.7-3.5-42.7 0l-1.8 .5c-13.3 3.3-25.6 9.7-35.9 18.6L56.4 165.8c-10.1 8.6-11.2 23.8-2.6 33.8s23.8 11.2 33.8 2.6l44.5-38.2c4.7-4 10.3-6.9 16.3-8.4l1.8-.5c6.4-1.6 13-1.6 19.4 0l8.6 2.1-32.7 98c-8.5 25.5 2.3 53.4 25.7 66.5l88 49.5L225.1 480.8c-4 12.7 3.1 26.1 15.7 30.1s26.1-3.1 30.1-15.8L307 379.5c5.6-18-2.1-37.5-18.6-46.8l-32.1-18 28.1-84.4 5.6 18.2c7.2 23.5 28.9 39.5 53.5 39.5l8.4 0 16.5 0 23.5 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-23.9 0c1.2-82.9 11.4-134.5 24.1-164c12.4-28.7 22.4-28.1 23.7-28l.1 0 .1 0c1.3-.1 11.3-.7 23.7 28c13.5 31.4 24.2 87.7 24.2 180s-10.7 148.6-24.2 180c-12.4 28.7-22.4 28.1-23.7 28l-.1 0-.1 0c-1.3 .1-11.3 .7-23.7-28c-10.1-23.4-18.6-60.5-22.2-116l-18 0-30.1 0c8.8 140.7 47.6 192 94.1 192c53 0 96-66.6 96-256S469 0 416 0c-46.2 0-84.8 50.6-93.9 189.1l-5.8-18.9c-5.8-18.7-20.9-33.1-39.9-37.9l-95-23.7zm70.8 67.2l-38.3 115-19-10.7c-3.3-1.9-4.9-5.9-3.7-9.5L225 169l27.1 6.8zM122.5 317.1L103.4 368 24 368c-13.3 0-24 10.7-24 24s10.7 24 24 24l84.9 0c16.7 0 31.6-10.3 37.4-25.9l14.1-37.6-4.9-2.8c-14.1-8-25.4-19.3-33-32.6z" />
						</svg>
					</button>

					<button className="shop-box">
						<svg className="shop-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
							<path d="M256 48C141.1 48 48 141.1 48 256l0 40c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-40C0 114.6 114.6 0 256 0S512 114.6 512 256l0 144.1c0 48.6-39.4 88-88.1 88L313.6 488c-8.3 14.3-23.8 24-41.6 24l-32 0c-26.5 0-48-21.5-48-48s21.5-48 48-48l32 0c17.8 0 33.3 9.7 41.6 24l110.4 .1c22.1 0 40-17.9 40-40L464 256c0-114.9-93.1-208-208-208zM144 208l16 0c17.7 0 32 14.3 32 32l0 112c0 17.7-14.3 32-32 32l-16 0c-35.3 0-64-28.7-64-64l0-48c0-35.3 28.7-64 64-64zm224 0c35.3 0 64 28.7 64 64l0 48c0 35.3-28.7 64-64 64l-16 0c-17.7 0-32-14.3-32-32l0-112c0-17.7 14.3-32 32-32l16 0z" />
						</svg>
					</button>

					<button onClick={handleOpenCart} className="shop-box">
						<svg className="shop-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
							<path d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
						</svg>
						{cartItemCount > 0 && <span className="shop-count">{cartItemCount}</span>}
					</button>

					<button onClick={() => setDarkMode((prev) => !prev)} className={darkMode ? "btn btn-light" : "btn btn-dark"}>
						<img src={darkMode ? "/images/sun.svg" : "/images/moon.svg"} alt={darkMode ? "light" : "dark"} style={{ width: "30px", height: "30px" }} />
					</button>
				</div>
			</div>
		</>
	);
}
