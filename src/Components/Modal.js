import { useState, useRef, useEffect } from 'react'
import styled from "styled-components"

const Container = styled.div`
	position: fixed;
	background-color: rgba(0,0,0, 0.6);
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	display: flex;
	justify-content: center;
	align-items: flex-start;
	padding-top: 5rem;
	margin: 0;
	z-index: 3;
	margin-bottom: 0 !important;
	margin-right: 0 !important;
`

const Box = styled.div`
	border: ${(props) => props.theme.borderStyle};
	background-color: #2A2A2A;
	border-radius: 3px;
	max-width: 50rem;
	width: 100%;
`

const Top = styled.div`
	display: flex;
	align-items: center;
	border-bottom: ${(props) => props.theme.borderStyle};
`

const CloseButton = styled.button`
	width: 3rem;
	height: 3rem;
	border: none;
	background-color: unset;
	display: flex;
	align-items: center;
	justify-content: center;

	:hover {
		background-color: rgba(255,255,255, 0.1);
	}
`

const CreateButton = styled(CloseButton)`
	color: white;
	width: auto;
	padding: 0 1rem;
	font-size: 0.9rem;
`

const InputContainer = styled.div`
	padding: 1rem;
`

const TextInput = styled.input`
	background-color: #2E2E2E;
	border: ${(props) => props.theme.borderStyle};
	border-radius: 3px;
	width: 100%;
	color: white;
	font-size: 0.9rem;
	padding: 0.5rem;
`

const Title = styled.p`
	width: 100%;
	margin-left: 1rem;
`

const Bottom = styled.div`
	display: flex;
	justify-content: flex-end;
	border-top: ${(props) => props.theme.borderStyle};
`

export default function Modal({ title, buttonTitle, onDone, onClose }) {
	const [nameInput, setNameInput] = useState('')
	const boxEl = useRef(null)

	const handleClickOutside = (event) => {
		if (boxEl.current && !boxEl.current.contains(event.target)) {
			onClose()
		}
	};

	useEffect(() => {
		document.addEventListener('click', handleClickOutside, true);
		return () => {
			document.removeEventListener('click', handleClickOutside, true);
		}
	})

	const onClickDone = () => {
		if (nameInput.trim() !== '') {
			onDone(nameInput)
		}
	}

	return (
		<Container onClick={(e) => e.preventDefault()}>
			<Box ref={boxEl}>
				<Top>
					<Title>{ title }</Title>
					<CloseButton onClick={onClose}>
						<i
							className="bi bi-x-circle-fill"
							style={{
								color: 'rgb(121, 121, 121)'
							}}
						/>
					</CloseButton>
				</Top>
				<InputContainer>
					<TextInput onChange={(e) => setNameInput(e.target.value)}/>
				</InputContainer>
				<Bottom>
					<CreateButton onClick={onClickDone}>
						{ buttonTitle }
					</CreateButton>
				</Bottom>
			</Box>
		</Container>
	)
}
