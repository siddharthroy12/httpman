import { useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

const Container = styled.div`
	padding: 0.5rem 1rem;

	transition-duration: 0ms !important;

	:hover {
		background-color: rgba(255,255,255, 0.1);
		transition-duration: 0ms !important;

		> button {
			display: block;
		}
	}

	display: flex;
	justify-content: space-between;

	> div {
		display: flex;
	}

	> button {
		display: none;
	}

	position: relative;
`

const Name = styled.p`
	font-size: 0.9rem;
`

const Method = styled.p`
	font-size: 0.8rem;
	margin-right: 1rem;
	color: ${(props) => {
		switch (props.method) {
			case 'GET':
				return '#8E84CB'
			case 'POST':
				return '#80C860'
			case 'PATCH':
				return '#E29E34'
			case 'DELETE':
				return '#EA6758'
			default:
				return 'white'
		}
	}};
`

const DropdownBtn = styled.button`
	border: none;
	background-color: unset;
	color: #B6B6B6;

	:hover {
		color: white;
	}
`

const DropdownMenu = styled.div`
	position: absolute;
	right: 0;
	top: 2rem;
	padding: 1rem;
	border: 1px solid red;
	z-index: 2;
`

export default function RequestItem({ id, requestId }) {
	const [menuOpen, setMenuOpen] = useState(false)
	const requestInfo = useSelector(state => state.project[id].requests[requestId])

	return (
		<Container>
			<div>
				<Method method={requestInfo.method}>{requestInfo.method}</Method>
				<Name>{requestInfo.name}</Name>
			</div>
			<DropdownBtn onClick={() => setMenuOpen(prev => !prev)}>
				<i
					className="bi bi-caret-down-fill"
				/>
			</DropdownBtn>
			{menuOpen && (
				<DropdownMenu>

				</DropdownMenu>
			)}
		</Container>
	)
}
