import { useContext } from 'react'
import VariablesContext from './VariablesContext'

export default function Variable({ id }) {
	const { variables, setVariables } = useContext(VariablesContext)

	const variable = variables.find(variable => variable.id === id)

	return (
		<div className='flex flex-col py-2 px-4 rounded-lg bg-slate-100 border border-slate-200'>
			<p className='text-sm font-medium text-slate-400'>{variable.name}</p>
			<input
				type='number'
				className='text-2xl font-extrabold text-slate-600 bg-transparent focus:outline-none'
				value={variable.value}
				onChange={e => {
					const newVariables = variables.map(variable => {
						if (variable.id === id) {
							return {
								...variable,
								value: e.target.value,
							}
						}

						return variable
					})

					setVariables(newVariables)
				}}
			/>
		</div>
	)
}
