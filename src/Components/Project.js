import { useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
	padding: 1rem;
	border-radius: 3px;
	border: ${(props) => props.theme.borderStyle};
	display: inline-block;
	width: 10rem;

	:hover {
		border-color: #ACA0F2;
	}
`

const Section = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`

const MenuBtn = styled.button`
	background-color: unset;
	border: none;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 1.3rem;
	height: 1.3rem;
	position: relative;

	:hover {
		background-color: rgba(0,0,0, 0.1);
	}
`

const Menu = styled.div`
	position: absolute;
	border: ${(props) => props.theme.borderStyle};
	padding: 1rem;
	background-color: #2A2A2A;
	border-radius: 3px;
	margin-top: 5rem;
`

const TimeStamp = styled.p`
	font-size: 0.9rem;
	color:  #5f5f5f;
`

export default function Project({ name , id }) {
	const [menuOpen, setMenuOpen] = useState(false);

	return (
		<Container>
			<Section>
				<p>Agrus</p>
				<MenuBtn onClick={() => setMenuOpen(prev => !prev)}>
					<i
						className="bi bi-three-dots-vertical"
						style={{
							color: 'rgb(121, 121, 121)'
						}}
					/>
					{menuOpen && (<Menu>

					</Menu>)}
				</MenuBtn>
			</Section>
			<br />
			<Section>
				<div style={{ display: 'flex'}}>
					<i
						className="bi bi-clock"
						style={{
							marginRight: '0.5rem',
							color: 'rgb(121, 121, 121)'
						}}
					/>
					<TimeStamp>
						6 Hour ago
					</TimeStamp>
				</div>
			</Section>
		</Container>
	)
}
