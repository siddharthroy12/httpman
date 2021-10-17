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

export default function QueryInput({id, requestId, queryIndex}) {
	const dispatch = useDispatch()
	const projectState = useSelector(state => state.project[id])
	const queries = projectState.requests[requestId].queries

	const updateQueryName = (event) => {
		let queriesCopy = [...queries]
		queriesCopy[queryIndex].name = event.target.value
		
		dispatch(updateRequest(id, requestId, null, null, queriesCopy))		
	}

	const updateQueryValue = (event) => {
		let queriesCopy = [...queries]
		queriesCopy[queryIndex].value = event.target.value

		dispatch(updateRequest(id, requestId, null, null, queriesCopy))		
	}

	const deleteQuery = () => {
		let queriesCopy = [...queries]
		queriesCopy = queriesCopy.filter((_, index) => index !== queryIndex)
	
		dispatch(updateRequest(id, requestId, null, null, queriesCopy))		
	}

	return (
		<Container>
			<Input type="text" placeholder="name" value={queries[queryIndex].name} onChange={updateQueryName} />
			<Input type="text" placeholder="value" value={queries[queryIndex].value} onChange={updateQueryValue} />
			<DeleteBtn onClick={deleteQuery}>	
				<i
					className="bi bi-x-circle-fill"
					style={{fontSize: '0.8rem', marginLeft: '10px', color: '#999999'}}>
				</i>
			</DeleteBtn>
		</Container>
	)
}
