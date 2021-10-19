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

export default function QueryInput({id, requestId, index, isQuery}) {
	const dispatch = useDispatch()
	const projectState = useSelector(state => state.project[id])
	const queries = projectState.requests[requestId].queries
	const headers = projectState.requests[requestId].headers
	const name = isQuery ? queries[index].name : headers[index].name 
	const value = isQuery ? queries[index].value : headers[index].value 

	const updateName = (event) => {
		let copy = isQuery ? [...queries] : [...headers]
		copy[index].name = event.target.value
	
		if (isQuery) { 
			dispatch(updateRequest(id, requestId, null, null, copy))		
		} else {
			dispatch(updateRequest(id, requestId, null, null, null, copy))
		}
	}

	const updateValue = (event) => {
		let copy = isQuery ? [...queries] : [...headers]
		copy[index].value = event.target.value
	
		if (isQuery) { 
			dispatch(updateRequest(id, requestId, null, null, copy))		
		} else {
			dispatch(updateRequest(id, requestId, null, null, null, copy))
		}
	}

	const deleteQuery = () => {
		let queriesCopy = [...queries]
		queriesCopy = queriesCopy.filter((_, i) => i !== i)
	
		dispatch(updateRequest(id, requestId, null, null, queriesCopy))		
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
