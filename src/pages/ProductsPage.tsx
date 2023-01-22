import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../hooks'
import Pagination from '../components/PaginationComponent';
import ProductList from '../components/ProductListComponent'
import { useParams  } from "react-router-dom";
import Search from '../components/SearchComponent';
import { Product } from '../store/slieces/ProductSlice';
import Modal from '../components/ProductModalComponent';



function ProductBlock() {
	const {products, isLoading, error, searched, totalPage} = useAppSelector(store => store.products)
	const [page, setPage] = useState('')
	const [activeProduct, setActiveProduct] = useState<Product | undefined>(undefined)
	const params = useParams()

	useEffect(() => {
		setPage(params.page || '1')
		errorHandler()
	}, [params, error])

	let productHandler = (product: Product) => {
		setActiveProduct(product)
	}
	let errorHandler = () => {
		if(error){
			alert(JSON.stringify(error.message))
		}
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
			{isLoading ? <tr><th>Loading ... </th></tr> : (
				searched?.toString() === '' ?
				<ProductList callback={productHandler} products={products}/>  : 
				<ProductList callback={productHandler} products={searched}/>
				)} 
			</tbody>
			</table>
		</div>
		<Pagination pagesQuan={totalPage} curPage={page}/>
	</div>

  </>)
}

export default ProductBlock