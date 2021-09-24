import { useState, useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { removeProject, renameProject } from '../Actions/ProjectActions'
import styled from 'styled-components'
import Modal from './Modal'
import { Link } from 'react-router-dom'

const Container = styled(Link)`
	padding: 1rem;
	border-radius: 3px;
	border: ${(props) => props.theme.borderStyle};
	display: inline-block;
	width: 10rem;
	text-decoration: none;
	color: white;

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
	cursor: pointer;

	:hover {
		background-color: rgba(0,0,0, 0.1);
	}
`

const Menu = styled.div`
	position: absolute;
	border: ${(props) => props.theme.borderStyle};
	overflow: hidden;
	background-color: #2A2A2A;
	border-radius: 3px;
	margin-top: 5rem;
	width: 10rem;
	left: -5px;
	top: -50px;
	padding: 0.2rem 0;
`

const MenuItem = styled.button`
	border: none;
	background-color: unset;
	color: ${(props) => props.red ? '#F45866' : 'white'};
	padding: 0.5rem 1rem;
	width: 100%;
	text-align: start;

	:hover {
		background-color: rgba(225,225,225, 0.1);
	}
`

const MenuDivider = styled.hr`
	border: none;
	border-bottom: 1px solid #3e3e3e;
	margin: 0.2rem 0;
`

const TimeStamp = styled.p`
	font-size: 0.9rem;
	color:  #5f5f5f;
`

export default function Project({ name , id }) {
	const [menuOpen, setMenuOpen] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false)
	const [showRenameModal, setShowRenameModal] = useState(false)
	const menuEl = useRef(null);
	const dispatch = useDispatch()

	const handleClickOutside = (event) => {
		if (menuEl.current && !menuEl.current.contains(event.target)) {
			setMenuOpen(false)
		}
	};

	useEffect(() => {
		document.addEventListener('click', handleClickOutside, true);
    return () => {
        document.removeEventListener('click', handleClickOutside, true);
    };
	})

	const onDeleteConfirm = (name_) => {
		if (name_ === name) {
			dispatch(removeProject(id))
			setShowDeleteModal(false)
		}
	}

	const onRename = (newName) => {
		dispatch(renameProject(id, newName))
		setShowRenameModal(false)
	}

	return (<>
		{showDeleteModal && (<>
			<Modal
				title={`Enter '${name}' to confim delete`}
				buttonTitle="Confirm"
				onDone={onDeleteConfirm}
				onClose={() => setShowDeleteModal(false)}
			/>
		</>)}
		{showRenameModal && (<>
			<Modal
				title="Rename Project"
				buttonTitle="Rename"
				onDone={onRename}
				onClose={() => setShowRenameModal(false)}
			/>
		</>)}
		<Container to={`/project/${id}`}>
			<Section>
				<p>{ name }</p>
				<MenuBtn onClick={(e) => { setMenuOpen(prev => !prev); e.preventDefault() }}>
					<i
						className="bi bi-three-dots-vertical"
						style={{
							color: 'rgb(225, 225, 225)'
						}}
					/>
					{menuOpen && (<Menu ref={menuEl}>
						<MenuItem>Duplicate</MenuItem>
						<MenuItem onClick={() => setShowRenameModal(true)}>Rename</MenuItem>
						<MenuDivider></MenuDivider>
						<MenuItem red={true} onClick={() => setShowDeleteModal(true)}>Delete</MenuItem>
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
	</>)
}