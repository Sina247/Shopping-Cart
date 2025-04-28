import { Provider } from "react-redux";
import { store } from "./store/store";
import Navbar from "./components/Navbar";
import Product from "./components/Product";
import Footer from "./components/Footer";
import ProductList from "./components/ProductList";
import { productData } from "./data/items";

export default function App() {
	return (
		<Provider store={store}>
			<Navbar />
			<ProductList>
				{productData.map((item) => (
					<div key={item.id}>
						<Product {...item} />
					</div>
				))}
			</ProductList>
			<Footer />
		</Provider>
	);
}
