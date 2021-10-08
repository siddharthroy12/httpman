import { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import Modal from '../Components/Modal'
import RequestItem from '../Components/RequestItem'
import BodyInput from '../Components/BodyInput'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { addRequest, updateRequest } from '../Actions/ProjectActions'
import searchString from '../Utils/searchString'

const Container = styled.div`
	height: calc(100vh - 3.5rem);
	display: flex;
	flex-direction: row;
`

const Top = styled.div`
	display: flex;
	position: relative;
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

const SidebarBottom = styled.div`
	padding-top: 0.5rem;
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
	z-index: 2;
`

const Divider = styled.hr`
	border: ${(props) => props.theme.borderStyle};
	margin: 0.5rem 0;
`

const MenuItem = styled.button`
	border: none;
	background-color: unset;
	color: ${(props) => props.red ? '#F45866' : 'white'};
	padding: 0.5rem 1rem;
	width: 100%;
	text-align: start;

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
	width: 50rem;
	height: 100%;
`

const MethodBtn = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	border: none;
	background: unset;
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

	:hover {
		background-color: rgba(225,225,225, 0.1);
	}

	padding: 0 1rem;

	> i {
		margin-left: 0.5rem;
	}

	font-size: 0.8rem;
`

const MethodBtnMenu = styled.div`
	position: absolute;
	padding: 0.2rem 0;
	border: 1px solid red;
	width: 10rem;
	border-radius: 3px;
	top: 3.3rem;
	left: 0.3rem;
	background-color: #2A2A2A;
	border: ${(props) => props.theme.borderStyle};
`

const UrlInput = styled.input`
	border: none;
	background-color: unset;
	color: white;
	font-size: 0.9rem;
	width: 100%;
	padding: 0.5rem;
`

const SendRequestBtn = styled.button`
	border: none;
	background-color: unset;
	color: white;
	padding: 0 1rem;
	font-size: 0.8rem;

	:hover {
		background-color: rgba(225,225,225, 0.1);
	}
`

export default function Project() {
	const { id } = useParams()
	const projectState = useSelector(state => state.project[id])
	const dispatch = useDispatch()
	const addButtonEl = useRef(null)
	const methodMenuEl = useRef(null)
	const [showAddButtonMenu, setShowAddButtonMenu] = useState(false)
	const [showMethodButtonMenu, setShowMethodButtonMenu] = useState(false)
	const [showAddRequestModal, setShowAddRequestModal] = useState(false)
	const [selectedItem, setSelectedItem] = useState(null)
	const [filter, setFilter] = useState('')

	const handleClickOutside = (event) => {
		if (addButtonEl.current && !addButtonEl.current.contains(event.target)) {
			setShowAddButtonMenu(false)
		}
		if (methodMenuEl.current && !methodMenuEl.current.contains(event.target)) {
			setShowMethodButtonMenu(false)
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

	if (selectedItem !== null && projectState.requests[selectedItem] === undefined) {
		setSelectedItem(null)
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
					<TextInput placeholder="Filter" value={filter} onChange={(e) => setFilter(e.target.value)}/>
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
				<SidebarBottom>
				{Object.keys(projectState.requests).map(index => {
						const item = projectState.requests[index]
						
						if (item.type === "REQUEST" && item.pinned) {
							return (
								<RequestItem
									key={index}
									id={id}
									requestId={index}
									selected={false}
									onClick={() => setSelectedItem(index)}
								/>
							)
						} else {
							return null
						}
					})}
					{projectState.requests.filter((item) => item.pinned).length > 0 && (<Divider />)}
					{Object.keys(projectState.requests).map(index => {
						const item = projectState.requests[index]

						if (filter.trim() !== '') {
							if (!searchString(filter, item.name)) {
								return null
							}
						}

						switch (item.type) {
							case "REQUEST":
								return (
									<RequestItem
										key={index}
										id={id}
										requestId={index}
										selected={index === selectedItem}
										onClick={() => setSelectedItem(index)}
									/>
								)
								default:
								break
						}
						return null
					})}
				</SidebarBottom>
			</Sidebar>
			<Center>
				<Top>
					{selectedItem && projectState.requests[selectedItem] !== undefined && (<>
						<MethodBtn method={projectState.requests[selectedItem].method} onClick={() => setShowMethodButtonMenu(prev => !prev)}>
							{projectState.requests[selectedItem].method}
							<i className="bi bi-caret-down-fill" />
						</MethodBtn>
						{ showMethodButtonMenu && (<>
							<MethodBtnMenu ref={methodMenuEl}>
								<MenuItem method="GET" onClick={() => { dispatch(updateRequest(id, selectedItem, null, 'GET')); setShowMethodButtonMenu(false) } }>GET</MenuItem>
								<MenuItem method="POST" onClick={() => { dispatch(updateRequest(id, selectedItem, null, 'POST')); setShowMethodButtonMenu(false) } }>POST</MenuItem>
								<MenuItem method="PATCH" onClick={() => { dispatch(updateRequest(id, selectedItem, null, 'PATCH')); setShowMethodButtonMenu(false) } }>PATCH</MenuItem>
								<MenuItem method="DELETE" onClick={() => { dispatch(updateRequest(id, selectedItem, null, 'DELETE')); setShowMethodButtonMenu(false) } }>DELETE</MenuItem>
							</MethodBtnMenu>
						</>)}
						<UrlInput
							placeholder="https://localhost:400/api/login"
							value={projectState.requests[selectedItem].url}
							onChange={(event) => dispatch(updateRequest(id, selectedItem, event.target.value))}
						/>
						<SendRequestBtn>
							Send
						</SendRequestBtn>
					</>)}
				</Top>
				<div>
					{selectedItem && projectState.requests[selectedItem] !== undefined && (<>
						<BodyInput />
					</>)}
				</div>
			</Center>
			<Result>
				<Top>
				</Top>
			</Result>
		</Container>
	)
}
