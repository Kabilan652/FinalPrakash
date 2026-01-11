import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { SERVER_URL } from "../config";
import Loading from "./Loading"

const ProductPage = () => {
	const { category } = useParams()
	const [products, setProducts] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const getCategoryWiseProduct = async () => {
		setIsLoading(true);
		try {
			const res = await axios.get(`${SERVER_URL}/${category}`)
			setProducts(res.data.products)
			setIsLoading(false);
		} catch (error) {
			console.log(error)
			setIsLoading(false);
		}
	}

	useEffect(() => {
		getCategoryWiseProduct();
	}, [])

	return (
		<>
			<div className="container py-8">{category.toUpperCase()}</div>
			{isLoading && <div className="h-48 flex items-center justify-center"><Loading text="Loading..." /></div>}
			{!isLoading && <div className="container py-8 flex gap-8 flex-wrap items-center">
				{
					products.map((e, index) => {
						return (
							<ProductCard key={index} {...e} />
						)
					})
				}
			</div>}
		</>
	)
}

export default ProductPage