import { useDispatch, useSelector } from 'react-redux'
import { updateRequest } from '../Actions/ProjectActions'
import styled from 'styled-components'

const Container = styled.div`
	display: flex;
	align-items: center;
`

const Input = styled.input`
	border: none;
	border-bottom: ${(props) => props.theme.borderStyle};
	color: white;
	background-color: unset;
	width: 100%;
	font-size: 0.9rem;
	padding: 0.5rem;

	:first-child {
		margin-right: 0.5rem;
	}

	:last-child {
		margin-left: 0.5rem;
	}
`

const DeleteBtn = styled.button`
	border: none;
	background: unset;
	padding: 0;
`

export default function PairInput({id, requestId, folderId, index, isQuery}) {
	const dispatch = useDispatch()

	const requestState = useSelector(state => {
		if (folderId !== undefined && folderId !== null) {
			return state.project[id].requests[folderId].requests[requestId]
		} else {
			return state.project[id].requests[requestId]
		}
	})

	const queries = requestState.queries
	const headers = requestState.headers
	const structuredBody = requestState.structuredBody
	const name = isQuery === "query" ? queries[index].name : isQuery === "header" ? headers[index].name : structuredBody[index].name
	const value = isQuery === "query" ? queries[index].value : isQuery === "header" ? headers[index].value : structuredBody[index].value

	const updateName = (event) => {
		let copy = isQuery === "query" ? [...queries] : isQuery === "header" ? [...headers] : [...structuredBody]
		copy[index].name = event.target.value

		if (isQuery === "query") {
			dispatch(updateRequest(id, requestId, folderId, null, null, copy))
		} else if (isQuery === "header") {
			dispatch(updateRequest(id, requestId, folderId, null, null, null, copy))
		} else {
			dispatch(updateRequest(id, requestId, folderId, null, null, null, null, null, null, copy))
		}
	}

	const updateValue = (event) => {
		let copy = isQuery === "query" ? [...queries] : isQuery === "header" ? [...headers] : [...structuredBody]

		copy[index].value = event.target.value

		if (isQuery === "query") {
			dispatch(updateRequest(id, requestId, folderId, null, null, copy))
		} else if (isQuery === "header") {
			dispatch(updateRequest(id, requestId, folderId, null, null, null, copy))
		} else {
			dispatch(updateRequest(id, requestId, folderId, null, null, null, null, null, null, copy))
		}
	}

	const deleteQuery = () => {
		let copy = isQuery === "query" ? [...queries] : isQuery === "header" ? [...headers] : [...structuredBody]

		copy = copy.filter((_, i) => i !== index)

		if (isQuery === "query") {
			dispatch(updateRequest(id, requestId, folderId, null, null, copy))
		} else if (isQuery === "header") {
			dispatch(updateRequest(id, requestId, folderId, null, null, null, copy))
		} else {
			dispatch(updateRequest(id, requestId, folderId, null, null, null, null, null, null, copy))
		}
	}

	return (
		<Container>
			<Input type="text" placeholder="name" value={name} onChange={updateName} />
			<Input type="text" placeholder="value" value={value} onChange={updateValue} />
			<DeleteBtn onClick={deleteQuery}>	
				<i
					className="bi bi-x-circle-fill"
					style={{fontSize: '0.8rem', marginLeft: '10px', color: '#999999'}}>
				</i>
			</DeleteBtn>
		</Container>
	)
}
