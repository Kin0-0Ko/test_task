import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import Pagination from './Pagination';
import ProductList from './ProductList'
import { useParams  } from "react-router-dom";
import Search from './Search';
import { Product, productsSearch } from '../store/slieces/ProductSlice';
import Modal from './ProductModal';



function ProductBlock() {
	const {products, isLoading, error, searched} = useAppSelector(store => store.products)
	const params = useParams()
	const [a, setA] = useState(1)
	const [activeProduct, setActiveProduct] = useState<Product | undefined>(undefined)
	const dispatch = useAppDispatch()


	useEffect(() => {
		dispatch(productsSearch(0))
		setA(parseInt(params.page || '1'))
	}, [params])

	let productHandler = (product: Product) => {
		setActiveProduct(product)
	}

	

  return (<>
	<Modal product={activeProduct}/>

	<div style={{ display: 'flex', alignItems: 'center',  flexDirection: 'column'}}>
		<Search/>
		<div style={{ display: 'flex', justifyContent: 'center'}}>
			<table style={{ width: '600px', height: '300px'}}>
				<thead>
				<tr>
					<th>Id</th>
					<th>Name</th>
					<th>Year</th>
				</tr>
				</thead>
				<tbody>
			{error ? <span>{error}</span> : (
				searched.toString() === '' ?
				(a.toString() !== 'NaN' ? <ProductList callback={productHandler} products={products.slice((a-1)*5, (a-1)*5+5)}/> : <ProductList callback={productHandler} products={products.slice(0, 5)}/>) : 
				<ProductList callback={productHandler} products={searched}/>
				)} 
			</tbody>
			</table>
		</div>
		<Pagination pagesQuan={Math.ceil(products.length/5)} curPage={a.toString()}/>
	</div>

  </>)
}

export default ProductBlock