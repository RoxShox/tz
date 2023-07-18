import { useRef, useState } from "react"

interface Param {
	id: number
	name: string
	type: "string" | "number" | "select"
}
interface ParamValue {
	paramId: number
	value: string | string[] | number
}
interface Model {
	paramValues: ParamValue[]
	// colors: Color[];
}
interface Props {
	params: Param[]
	model: Model
}

const param: Param[] = [
	{ id: 1, name: "Назначение", type: "string" },
	{ id: 2, name: "Длина", type: "number" },
	{ id: 3, name: "Массив", type: "select" },
	{ id: 4, name: "Массив ", type: "select" },
]

const model = {
	paramValues: [
		{
			paramId: 1,
			value: "повседневное",
		},
		{
			paramId: 2,
			value: 245,
		},
		{
			paramId: 3,
			value: ["audi", "bmw", "mercedes"],
		},
		{
			paramId: 4,
			value: ["german", "england", "american"],
		},
	],
}

const App = () => {
	const [value, setValue] = useState()

	return (
		<div className="App">
			{param.map((el) => (
				<ListItem model={model} key={el.id} item={el} />
			))}
		</div>
	)
}

export default App

type ListProps = {
	item: Param
	model: Model
}

const ListItem = ({ item, model }: ListProps) => {
	const findModel = model.paramValues.find((el) => el.paramId === item.id)
	const [value, setValue] = useState(findModel?.value)

	const getModel = () => {
		const newObj = { ...item, value }
		console.log(newObj)
	}

	return (
		<div>
			<span>{item.name}</span>
			<button onClick={getModel}>Отдать Модель</button>
			{item.type === "string" ? (
				<input
					type="text"
					value={value}
					onChange={(e) => setValue(e.target.value)}
				/>
			) : item.type === "number" ? (
				<input
					type="number"
					value={value}
					onChange={(e) => setValue(e.target.value)}
				/>
			) : Array.isArray(findModel?.value) ? (
				<select value={value} onChange={(e) => setValue(e.target.value)}>
					{findModel?.value.map((el, i) => (
						<option value={el} key={i}>
							{el}
						</option>
					))}
				</select>
			) : (
				""
			)}
		</div>
	)
}
