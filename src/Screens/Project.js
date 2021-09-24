import { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import Modal from '../Components/Modal'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { addRequest } from '../Actions/ProjectActions'

const Container = styled.div`
	height: calc(100vh - 3.5rem);
	display: flex;
	flex-direction: row;
`

const Top = styled.div`
	display: flex;
	flex-direction: row;
	height: 3rem;
	border-bottom: ${(props) => props.theme.borderStyle};
`

const Sidebar = styled.div`
	height: 100%;
	width: 25rem;
`

const SidebarTop = styled(Top)`
	padding: 0.5rem;
`

const TextInput = styled.input`
	border: ${(props) => props.theme.borderStyle};
	padding: 0.5rem;
	background-color: unset;
	font-size: 0.8rem;
	color: white;
	border-radius: 3px;
	width: 100%;
`

const AddButton = styled.button`
	border: none;
	background-color: unset;
	display: flex;
	justify-content: space-evenly;
	align-items: center;

	:hover {
		background-color: rgba(225,225,225, 0.1);
	}
	width: 5rem;
	border-radius: 3px;
	position: relative;
`

const AddButtonMenu = styled.div`
	position: absolute;
	border: ${(props) => props.theme.borderStyle};
	background-color: #2A2A2A;
	border-radius: 3px;
	top: 40px;
	left: 0px;
	width: 10rem;
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

const Center = styled.div`
	border-left: ${(props) => props.theme.borderStyle};
	border-right: ${(props) => props.theme.borderStyle};
	width: 100%;
	height: 100%;
`

const Result = styled.div`
	width: 40rem;
	height: 100%;
`

export default function Project() {
	const { id } = useParams()
	const projectState = useSelector(state => state[id])
	const dispatch = useDispatch()
	const addButtonEl = useRef(null)
	const [showAddButtonMenu, setShowAddButtonMenu] = useState(false)
	const [showAddRequestModal, setShowAddRequestModal] = useState(false)

	const handleClickOutside = (event) => {
		if (addButtonEl.current && !addButtonEl.current.contains(event.target)) {
			setShowAddButtonMenu(false)
		}
	};

	useEffect(() => {
		document.addEventListener('click', handleClickOutside, true);
    return () => {
        document.removeEventListener('click', handleClickOutside, true);
    };
	})

	const onAddRequestConfirm = (name) => {
		dispatch(addRequest(id, name))
		setShowAddRequestModal(false)
	}

	return (
		<Container>
			{showAddRequestModal && (
				<Modal
					title="New Request"
					buttonTitle="Create"
					onDone={onAddRequestConfirm}
					onClose={() => setShowAddRequestModal(false)}
				/>
			)}
			<Sidebar>
				<SidebarTop>
					<TextInput placeholder="Filter"/>
					<AddButton onClick={() => setShowAddButtonMenu(prev => !prev)} ref={addButtonEl}>
						<i
							className="bi bi-caret-down-fill"
							style={{
								color: 'rgb(225, 225, 225)'
							}}
						/>
						<i
							className="bi bi-plus-circle-fill"
							style={{
								color: 'rgb(225, 225, 225)'
							}}
						/>
						{showAddButtonMenu && (
							<AddButtonMenu>
								<MenuItem onClick={() => setShowAddRequestModal(true)}>
									<i
										className="bi bi-plus-circle-fill"
										style={{
											color: 'rgb(225, 225, 225)',
											marginRight: '1rem'
										}}
									/>
									Add Request
								</MenuItem>
								<MenuItem>
									<i
										className="bi bi-folder-fill"
										style={{
											color: 'rgb(225, 225, 225)',
											marginRight: '1rem'
										}}
									/>
									Add Folder
								</MenuItem>
							</AddButtonMenu>
						)}
					</AddButton>
				</SidebarTop>	
			</Sidebar>
			<Center>
				<Top>

				</Top>
			</Center>
			<Result>
				<Top>

				</Top>
			</Result>
		</Container>
	)
}
