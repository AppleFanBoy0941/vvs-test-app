import { useContext } from 'react'
import RoomContext from './RoomContext'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Room({ id }) {
	const { rooms, setRooms } = useContext(RoomContext)

	const room = rooms.find(room => room.id === id)

	function handleClick(direction) {
		const newRooms = rooms.map(room => {
			if (room.id === id) {
				return {
					...room,
					justering: Math.round((room.justering + direction * 0.1) * 10) / 10,
				}
			}
			return room
		})

		setRooms(newRooms)
	}

	if (!room.projected) {
		return
	}

	const efterJustering = parseInt((room.measured + room.justering) * 10) / 10

	const forholdListe = rooms.map(r => {
		return {
			id: r.id,
			forhold: parseInt((r.projected / r.kalk) * 100) / 100,
		}
	})

	function findPosition() {
		const forhold = forholdListe.find(f => f.id === id).forhold

		const sortedForhold = forholdListe.map(f => f.forhold).sort((a, b) => b - a)
		console.log(sortedForhold)

		const position = sortedForhold.indexOf(forhold) + 1

		return position
	}

	return (
		<div className='bg-slate-100/50 px-4 py-6 text-slate-800 border border-slate-200/50 rounded-lg flex flex-col gap-6'>
			<div className='flex justify-between items-end'>
				<h1 className='text-2xl font-extrabold flex items-center gap-2'>
					<motion.span
						key={findPosition()}
						initial={{ rotate: -45 }}
						animate={{ rotate: 0 }}
						className='flex h-6 w-6 bg-slate-400 text-base justify-center items-center rounded-full text-slate-50'
					>
						{findPosition()}
					</motion.span>
					{room.name}
				</h1>
				<p className='text-sm font-semibold text-slate-600'>{room.sqm} m²</p>
			</div>
			<div className='grid grid-cols-5 gap-8'>
				<div className='flex flex-col gap-2 col-span-1'>
					<p className='uppercase font-bold text-sm tracking-wider text-slate-600'>
						Målt
					</p>
					<div className='flex flex-col items-start justify-center h-full'>
						<p className='text-2xl font-bold  text-slate-600'>
							{room.measured}
						</p>
					</div>
				</div>
				<div className='flex flex-col gap-2 col-span-3'>
					<p className='uppercase font-bold text-sm tracking-wider text-center text-slate-600'>
						Efter
					</p>
					<div className='grid grid-cols-3 items-center justify-center place-content-center h-full p-0 border border-slate-200/75 rounded-md bg-slate-50/25'>
						<button
							className='flex items-center justify-center p-4 text-slate-600'
							onClick={() => handleClick(1)}
						>
							<ChevronUp size={24} />
						</button>
						<div className='flex items-center justify-center'>
							<motion.p
								key={efterJustering}
								initial={{ scale: 0.8, y: 8, opacity: 0 }}
								animate={{ scale: 1, y: 0, opacity: 1 }}
								className='text-2xl font-extrabold w-fit text-center'
							>
								{efterJustering}
							</motion.p>
						</div>
						<button
							className='flex items-center justify-center p-4 text-slate-600'
							onClick={() => handleClick(-1)}
						>
							<ChevronDown size={24} />
						</button>
					</div>
				</div>
				<div className='flex flex-col gap-2 col-span-1'>
					<p className='uppercase font-bold text-sm tracking-wider ml-auto text-slate-600'>
						Proj.
					</p>
					<div className='flex flex-col items-end justify-center h-full'>
						<p className='text-2xl font-bold  text-slate-600'>
							{room.projected}
						</p>
					</div>
				</div>
			</div>
			<div className='grid grid-cols-2'>
				<div className='flex flex-col gap-2'>
					<p className='text-sm font-bold uppercase tracking-wider text-slate-600'>
						Kalk.
					</p>
					<p className='text-2xl font-extrabold font-mono'>{room.kalk}</p>
				</div>
				<div className='flex flex-col items-end gap-2'>
					<p className='text-sm font-bold uppercase tracking-wider text-slate-600'>
						Proj./Målt
					</p>
					<p className='text-2xl font-extrabold font-mono'>
						{parseInt((room.projected / room.kalk) * 100) / 100}
					</p>
				</div>
			</div>
		</div>
	)
}
