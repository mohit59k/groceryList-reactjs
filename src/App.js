import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

const getLocalData = () => {
	let list = localStorage.getItem('list')
	if (list) {
		return JSON.parse(localStorage.getItem('list'))
	} else return []
}

function App() {
	const [name, setName] = useState('')
	const [list, setList] = useState(getLocalData())
	const [isEditing, setIsEditing] = useState(false)
	const [editId, setEditID] = useState(null)
	const [alert, setAlert] = useState({ show: false, msg: '', type: '' })
	const handleSubmit = (e) => {
		e.preventDefault()
		if (!name) {
			showAlert(true, 'danger', 'Please enter a value')
		} else if (name && isEditing) {
			setList(
				list.map((data) => {
					if (data.id === editId) {
						return { ...data, title: name }
					}
					return data
				})
			)
			setName('')
			setEditID(null)
			setIsEditing(false)
			showAlert(true, 'success', 'edited')
		} else {
			showAlert(true, 'success', 'Item added')
			const newItem = { id: new Date().getTime().toString(), title: name }
			setList([...list, newItem])
			setName('')
		}
	}
	const showAlert = (show = false, type = '', msg = '') => {
		setAlert({
			show,
			msg,
			type,
		})
	}
	const clearList = () => {
		showAlert(true, 'danger', 'List cleared')
		setList([])
	}
	function delItem(id) {
		setList(
			list.filter((listItem) => {
				return listItem.id !== id
			})
		)
		showAlert(true, 'danger', 'Item cleared')
	}
	function editItem(id) {
		const found = list.find((ele) => {
			return ele.id === id
		})
		console.log(found)
		if (id === found.id) {
			console.log(id)
			setIsEditing(true)
			setName(found.title)
			setEditID(id)
		}
	}
	useEffect(() => {
		localStorage.setItem('list', JSON.stringify(list))
	}, [list])
	return (
		<section className='section-center'>
			<form onSubmit={handleSubmit} className='grocery-form'>
				{alert.show && <Alert val={alert} rem={showAlert} />}
				<h3>Grocery Bud</h3>
				<div className='form-control'>
					<input
						type='text'
						className='grocery'
						placeholder='e.g eggs'
						value={name}
						onChange={(e) => {
							setName(e.target.value)
						}}
					/>
					<button type='submit' className='submit-btn'>
						{isEditing ? 'edit' : 'submit'}
					</button>
				</div>
			</form>
			{list.length > 0 && (
				<div className='grocery-container'>
					<List data={list} remItem={delItem} editItem={editItem} />
					<button className='clear-btn' onClick={clearList}>
						Clear Items
					</button>
				</div>
			)}
		</section>
	)
}

export default App
