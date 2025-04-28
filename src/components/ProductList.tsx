import { type ReactNode } from "react";

type ProductListProps = {
	children: ReactNode;
};

export default function ProductList({ children }: ProductListProps) {
	return (
		<div className="product-list">
			<div className="product-items">{children}</div>
		</div>
	);
}
