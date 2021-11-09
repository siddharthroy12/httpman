import { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import Modal from '../Components/Modal'
import RequestItem from '../Components/RequestItem'
import FolderItem from '../Components/FolderItem'
import BodyInput from '../Components/BodyInput'
import Response from '../Components/Response.js'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { addRequest, addFolder, updateRequest } from '../Actions/ProjectActions'
import searchString from '../Utils/searchString'
import generateQueryString from '../Utils/generateQueryString.js'

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

const AddButton = styled.div`
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
	z-index: 5;
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
	z-index: 10;
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
	background-color: #8E84CB;
	color: white;
	padding: 0 1rem;
	font-size: 0.9rem;

	:hover {
		background-color: rgb(142, 132, 203, 0.8);
	}
`

const StatusBlock = styled.p`
	background-color: ${(props) => {
		if (props.status < 200) { // 1xx status codes 
			return 'white'	
		} else if (props.status < 300) { // 2xx status codes
			return '#50FA7B'
		} else if (props.status < 400) { // 3xx status codes
			return '#F1FA8C'
		} else { // 4xx and 5xx status codes
			return '#E06B74'
		}
	}};
	color: black;
	padding: 0.4rem 0.5rem;
`

function getFullUrl(request) {
	return request.url + generateQueryString(request.queries)
}

export default function Project() {
	const { id } = useParams()
	const projectState = useSelector(state => state.project[id])
	const dispatch = useDispatch()
	const addButtonEl = useRef(null)
	const methodMenuEl = useRef(null)
	const [showAddButtonMenu, setShowAddButtonMenu] = useState(false)
	const [showMethodButtonMenu, setShowMethodButtonMenu] = useState(false)
	const [showAddRequestModal, setShowAddRequestModal] = useState(0) // 0 means no, 1 means request, 2 means folder
	const [response, setResponse] = useState(null)
	const [selectedItem, setSelectedItem] = useState(null)
	const [selectedFolder, setSelectedFolder] = useState(null)
	const [filter, setFilter] = useState('')
	let selectedItemState = null

	selectedItemState = selectedFolder !== null ? projectState.requests[selectedFolder].requests[selectedItem] :
			selectedItem !== null ? projectState.requests[selectedItem] : null

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
	dispatch(showAddRequestModal === 1 ? addRequest(id, name): addFolder(id, name))
	setShowAddRequestModal(0)
}

const sendRequest = async () => {
	let res
	let headers = {}
	const body = JSON.parse(projectState.requests[selectedItem].textBody)
	const method = projectState.requests[selectedItem].method 

	projectState.requests[selectedItem].headers.forEach(header => {
		if (header.name.trim() !== '' && header.value.trim() !== '') {
			headers[header.name] = header.value
		}
	})

	if (method === "POST" || method === "PUT") {
		headers["content-type"] = "application/json"
	}

	try {
		switch(projectState.requests[selectedItem].method) {
			case 'GET':
				res =	await axios.get(getFullUrl(projectState.requests[selectedItem]), { headers })
				setResponse(res)
				break;
			case 'POST':
				res = await axios.post(getFullUrl(projectState.requests[selectedItem]), body, { headers })
				setResponse(res)
				break;
			case 'PUT':
				res = await axios.put(getFullUrl(projectState.requests[selectedItem]), body, { headers })
				setResponse(res)
				break;
			case 'DELETE':
				res = await axios.delete(getFullUrl(projectState.requests[selectedItem]))
				setResponse(res)
				break;
			default:
				break;
			}
	} catch (error) {
		if (error.response) {
			setResponse(error.response)
		}
		console.log(error)
	}
}

const selectSubRequest = (folderId, requestId) => {
	setSelectedFolder(folderId)
	setSelectedItem(requestId)
}

console.log({selectedItemState});

return (
	<Container>
		{showAddRequestModal !== 0 && (
			<Modal
				title={showAddRequestModal === 1 ? "New Request" : "New Folder"}
				buttonTitle="Create"
				onDone={onAddRequestConfirm}
				onClose={() => setShowAddRequestModal(0)}
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
							<MenuItem onClick={() => setShowAddRequestModal(1)}>
								<i
									className="bi bi-plus-circle-fill"
									style={{
										color: 'rgb(225, 225, 225)',
										marginRight: '1rem'
									}}
								/>
								Add Request
							</MenuItem>
							<MenuItem onClick={() => setShowAddRequestModal(2)}>
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
								onClick={() => { setSelectedItem(index); setSelectedFolder(null)}}
							/>
						)
					} else if (item.type === "FOLDER") {
						return Object.keys(projectState.requests[index].requests).map(subIndex => {
							const subItem = projectState.requests[index].requests[subIndex]

							if (subItem.pinned) {
								return (
									<RequestItem
										key={index+subIndex} // Idk if thats a good idea
										id={id}
										requestId={subIndex}
										folderId={index}
										selected={false}
										onClick={() => {setSelectedItem(subIndex); setSelectedFolder(index)}}
									/>
								)
							}
							return null
						})
					}
					return null
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
									selected={index === selectedItem && selectedFolder === null}
									onClick={() => { setSelectedItem(index); setSelectedFolder(null) }}
									onDelete={() => { setSelectedItem(null)}}
								/>
							)

						case "FOLDER":
							return (
								<FolderItem
									key={index}
									id={id}
									requestId={index}
									selectedFolder={selectedFolder}
									selectedRequest={selectedItem}
									selectRequest={selectSubRequest}
									onDelete={() => { setSelectedItem(null); setSelectedFolder(null)}}
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
					{(selectedItemState !== null) && (<>
						<MethodBtn method={selectedItemState.method} onClick={() => setShowMethodButtonMenu(prev => !prev)}>
							{selectedItemState.method}
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
							value={selectedItemState.url}
							onChange={(event) => dispatch(updateRequest(id, selectedItem, event.target.value))}
						/>
						<SendRequestBtn onClick={sendRequest}>
							Send
						</SendRequestBtn>
					</>)}
				</Top>
				<div>
					{selectedItemState && (<>
						<BodyInput id={id} requestId={selectedItem} />
					</>)}
				</div>
			</Center>
			<Result>
				<Top style={{padding: '0.5rem', alignItems: 'center'}}>
					{response && (<>
						<StatusBlock status={response.status}>{response && response.status}</StatusBlock>
					</>)}
				</Top>
				<div>
					{response && (<>
						<Response response={response} />
				</>)}
				</div>
			</Result>
		</Container>
	)
}
