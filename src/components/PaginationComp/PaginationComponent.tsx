import React, { FC, useEffect, useState } from 'react'
import { useAppDispatch } from '../../hooks'
import { NavLink } from "react-router-dom";
import { fetchProducts } from '../../store/slieces/ProductSlice';
import { searchClean } from '../../store/slieces/ProductSlice';
import style from "./Pagination.module.css"
interface PaginationPorps {
	pagesQuan: number
	curPage: string
}

const Pagination: FC<PaginationPorps> = ({ pagesQuan, curPage }) => {
	const [pages, setPages] = useState<number[]>([])
	const dispatch = useAppDispatch()


	useEffect(() => {
		dispatch(fetchProducts(parseInt(curPage)))
		dispatch(searchClean())

	}, [curPage, dispatch])

	useEffect(() => {
		let arr = []
		for (let i = 0; i < pagesQuan; i++) {
			arr.push((i + 1))
		}
		setPages(arr)


	}, [pagesQuan])

	let arrowsHandler = (dir: boolean) => {
		let res = 0
		dir === true ? (res = (parseInt(curPage) === 1 ? 3 : parseInt(curPage) - 1)) : res = parseInt(curPage) !== pagesQuan ? parseInt(curPage) + 1 : 1;
		return res;
	}

	return (
		<div className={style.pagination}>
			<NavLink to={`/${arrowsHandler(true)}`}>&laquo;</NavLink>

			{pages.map(el =>
				<NavLink key={el} to={`/${el}`}>{el}</NavLink>)}
			<NavLink to={`/${arrowsHandler(false)}`}>&raquo;</NavLink>

		</div>
	)
}

export default Pagination