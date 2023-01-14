import React, { FC, useEffect, useState } from 'react'
import { useAppSelector } from '../hooks'
import { NavLink } from "react-router-dom";

interface PaginationPorps {
	pagesQuan: number
	curPage: string
}

const Pagination: FC<PaginationPorps> = ({ pagesQuan, curPage }) => {
	const { products } = useAppSelector(state => state.products)
	const [pages, setPages] = useState<number[]>([])
	const [page, setPage] = useState(parseInt(curPage) || 1)

	useEffect(() => {
		let arr = []
		for (let i = 0; i < pagesQuan; i++) {
			arr.push((i + 1))
		}
		setPages(arr)

	}, [products])

	let arrowsHandler = (dir: boolean) => {
		let res = 0
		dir === true ? (res = (parseInt(curPage) === 1 ? 3 : parseInt(curPage) - 1)) : res = parseInt(curPage) !== pagesQuan ? parseInt(curPage) + 1 : 1;
		return res;
	}

	return (
		<div style={{ display: "flex", justifyContent: "space-between", width: "500px" }}>
			<NavLink to={`/${arrowsHandler(true)}`}>&laquo;</NavLink>
			
			{pages.map(el => 
			<NavLink key={el} to={`/${el}`}>{el}</NavLink>
			)}


			<NavLink to={`/${arrowsHandler(false)}`}>&raquo;</NavLink>

		</div>
	)
}

export default Pagination