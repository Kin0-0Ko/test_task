import React, { FC, useEffect, useState } from 'react'
import { Product } from '../store/slieces/ProductSlice'

interface ModalProps {
	product: Product | undefined
}


const Modal: FC<ModalProps> = ({product}) => {
	const [active, setActive] = useState(false)
	console.log(active, product);
	useEffect(() => {

		product ? setActive(true) : setActive(false)
		
	}, [product])
	
  return (
	<div className={active ? `modal active` : 'modal'} onClick={() => setActive(false)}>
		<div className={`modal_content`} onClick={(e) => e.stopPropagation()}>
			{ product?.name}
		</div>
	</div>
  )
}

export default Modal	