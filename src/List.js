import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
const List = ({ data, remItem, editItem }) => {
	return (
		<div className='grocery-list'>
			{data.map((val) => {
				const { id, title } = val
				return (
					<article className='grocery-item' key={id}>
						<p className='title'>{title}</p>
						<div className='btn-container'>
							<button
								type='button'
								className='edit-btn'
								onClick={() => {
									editItem(id)
								}}
							>
								<FaEdit />
							</button>
							<button
								type='button'
								className='delete-btn'
								onClick={() => {
									remItem(id)
								}}
							>
								<FaTrash />
							</button>
						</div>
					</article>
				)
			})}
		</div>
	)
}

export default List
