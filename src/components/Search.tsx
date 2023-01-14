import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { productsSearch } from '../store/slieces/ProductSlice'

function Search() {
	const [input, setInput] = useState(' ')
	const {searched} = useAppSelector(state => state.products)
	const dispatch = useAppDispatch()

	let inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInput(e.target.value.replace(/[^\d]/g, ''))		
	}
	let search = () => {
		dispatch(productsSearch(parseInt(input)))
	}
	


  return <>
	<input onChange={(e) => inputHandler(e)} value={input}/>
	<button onClick={search}>Search</button>
	</>
  
}

export default Search