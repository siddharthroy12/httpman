import { useRef, useEffect } from 'react'
import styled from "styled-components"
import appIcon from '../appIcon.png'

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
	z-index: 5;
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

const Title = styled.p`
	width: 100%;
	margin-left: 1rem;
`

const Head = styled.div`
	text-align: center;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding-bottom: 1rem;

	> * {
		margin-top: 1rem;
	}
`

const AppIcon = styled.img`
	display: block;
	--size: 4rem;

	width: var(--size);
	height: var(---size);
`

const Links = styled.div`
	display: flex;
	justify-content: center;

	> * {
		margin: 0 0.5rem;
	}
}
`

export default function About({ onClose }) {
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

	return (
		<Container onClick={(e) => e.preventDefault()}>
			<Box ref={boxEl}>
				<Top>
					<Title>About</Title>
					<CloseButton onClick={onClose}>
						<i
							className="bi bi-x-circle-fill"
							style={{
								color: 'rgb(121, 121, 121)'
							}}
						/>
					</CloseButton>
				</Top>
				<Head>
					<AppIcon src={appIcon} />
					<p>HTTPMAN</p>
					<p>A Simple and Stupid HTTP Client</p>
					<Links>
						<a href="https://twitter.com/Siddharth_Roy12" target="_blank" rel="noreferrer">Author</a>
						<a href="https://github.com/siddharthroy12/httpman" target="_blank" rel="noreferrer">Source Code</a>
						<a href="https://github.com/siddharthroy12/httpman/issues" target="_blank" rel="noreferrer">Submit Issues</a>
					</Links>
				</Head>
			</Box>
		</Container>
	)
}
