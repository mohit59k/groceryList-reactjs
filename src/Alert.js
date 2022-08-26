import React, { useEffect } from 'react'
import List from './List'

const Alert = ({ val, rem }) => {
	useEffect(() => {
		const timer = setTimeout(() => {
			rem()
		}, 2000)
		return () => clearTimeout(timer)
	}, [List])
	const { msg, type } = val
	return <p className={`alert alert-${type}`}>{msg}</p>
}

export default Alert
