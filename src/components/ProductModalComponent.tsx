import React, { FC, useEffect, useState } from 'react'
import { Product } from '../store/slieces/ProductSlice'

interface ModalProps {
	product: Product | undefined
}


const Modal: FC<ModalProps> = ({product}) => {
	const [active, setActive] = useState(false)
	useEffect(() => {
		product ? setActive(true) : setActive(false)

	}, [product])
	
  return (
	<div className={active ? `modal active` : 'modal'} onClick={() => {setActive(false)}}>
		<div className={`modal_content`} style={{backgroundColor: product?.color}} onClick={(e) => e.stopPropagation()}>
				<h2>{product?.name}</h2>
				<span>{product?.year}</span>
		</div>
	</div>
  )
}

export default Modal	