import React, {FC} from 'react'
import { Product } from '../store/slieces/ProductSlice'

type ProductListProps = {
	products: Product[],
	callback: (product: Product) => void
}

const ProductList: FC<ProductListProps> = ({products, callback}) => {
  return (
	<>
		{products.map(el => 
			<tr onClick={() => callback(el)} key={el.id} style={{background: el.color, height: '30px'}}>
				<th>{el.id}</th>
				<th>{el.name}</th>
				<th>{el.year}</th>
			</tr>
			)}
	</>
  )
}

export default ProductList
