import { useState, useEffect } from 'react'
import Room from './Room'
import RoomContext from './RoomContext'
import VariablesContext from './VariablesContext'
import Variable from './Variable'

function App() {
	const [rooms, setRooms] = useState([
		{
			id: 1,
			name: 'Stue',
			sqm: 22.3,
			measured: 4.2,
			projected: 6.7,
			justering: 0,
			kalk: 4.2,
		},
		{
			id: 2,
			name: 'Køkken Alrum',
			sqm: 32.4,
			measured: 15.5,
			projected: 9.7,
			justering: 0,
			kalk: 15.5,
		},
		{
			id: 3,
			name: 'Bryggers',
			sqm: 9.8,
			measured: null,
			projected: null,
			justering: 0,
			kalk: null,
		},
		{
			id: 4,
			name: 'Bad',
			sqm: 5,
			measured: null,
			projected: null,
			justering: 0,
			kalk: null,
		},
		{
			id: 5,
			name: 'Værelse 1',
			sqm: 11.2,
			measured: 2.6,
			projected: 3.4,
			justering: 0,
			kalk: 2.6,
		},
		{
			id: 6,
			name: 'Værelse 2',
			sqm: 10.4,
			measured: 1.9,
			projected: 3.1,
			justering: 0,
			kalk: 1.9,
		},
		{
			id: 7,
			name: 'Soveværelse',
			sqm: 13.3,
			measured: 5.3,
			projected: 4,
			justering: 0,
			kalk: 5.3,
		},
	])

	useEffect(() => {
		const measuredTotal = rooms.reduce((acc, room) => {
			return acc + room.measured
		}, 0)

		const efterTotal = rooms.reduce((acc, room) => {
			return acc + (room.measured + room.justering)
		}, 0)

		const updatedRooms = rooms.map(room => {
			return {
				...room,
				kalk:
					parseInt(
						(((room.measured + room.justering) * measuredTotal) / efterTotal) *
							1000
					) / 1000,
			}
		})

		console.log(updatedRooms.map(room => room.kalk))

		setRooms(updatedRooms)
	}, [JSON.stringify(rooms)])

	const [variables, setVariables] = useState([
		{
			id: 1,
			name: 'Højde',
			value: 2.5,
		},
		{ id: 2, name: 'Luftskifte', value: 0.3 },
		{ id: 3, name: 'Ind/ud', value: 1.05 },
	])

	// useEffect(() => {
	// 	const updatedRooms = rooms.map(room => {
	// 		return {
	// 			...room,
	// 			projected: parseInt(room.sqm * variables[1].value * 10) / 10,
	// 		}
	// 	})

	// 	setRooms(updatedRooms)
	// }, [JSON.stringify(variables)])

	return (
		<RoomContext.Provider value={{ rooms, setRooms }}>
			<VariablesContext.Provider value={{ variables, setVariables }}>
				<div className='bg-slate-50 min-h-screen px-4 py-8 text-slate-800 flex flex-col gap-4'>
					<h1 className='text-4xl font-extrabold px-4'>VVS-app</h1>
					<div className='grid grid-cols-3 gap-2'>
						{variables.map(variable => (
							<Variable key={variable.id} id={variable.id} />
						))}
					</div>
					<div className='flex flex-col gap-6'>
						{rooms.map(room => (
							<Room key={room.id} id={room.id} />
						))}
					</div>
				</div>
			</VariablesContext.Provider>
		</RoomContext.Provider>
	)
}

export default App
