import React, {useState } from 'react'
import { useAppDispatch} from '../hooks'
import { searchProduct } from '../store/slieces/ProductSlice'

function Search() {
	const [input, setInput] = useState(' ')
	const dispatch = useAppDispatch()
	

	let inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInput(e.target.value.replace(/[^\d]/g, ''))		
	}
	let search = (e: React.MouseEvent | React.FormEvent) => {
		e.preventDefault()
		dispatch(searchProduct(parseInt(input)))
	}
	


  return <form onSubmit={e => search(e)}>
	<input  onChange={(e) => inputHandler(e)} value={input} />
	<button onClick={e => search(e)}>Search</button>
	</form>
  
}

export default Search