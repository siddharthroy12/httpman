import { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
	addRequest, deleteRequest, renameRequest
} from '../Actions/ProjectActions'
import Modal from './Modal'
import {
	Container, Name, DropdownBtn, DropdownMenu,
	MenuDivider, MenuItem
} from './RequestItem'
import RequestItem from './RequestItem'
import styled from 'styled-components'

const CustomContainer = styled(Container)`
	border-left: 4px solid ${props => props.color};
`

const Inner = styled.div`
	border-left: 4px solid ${props => props.color};
`

export default function FolderItem({ id, requestId, selectRequest, selectedFolder, selectedRequest, onDelete }) {
	const [menuOpen, setMenuOpen] = useState(false)
	const [folderOpen, setFolderOpen] = useState(false)
	const requestInfo = useSelector(state => state.project[id].requests[requestId])
	const menuEl = useRef(null);
	const [showRenameModal, setShowRenameModal] = useState(false)
	const [showAddRequestModal, setShowAddRequestModal] = useState(false)
	const [showDeleteModal, setShowDeleteModal] = useState(false)
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

	const onRenameConfirm = (newname) => {
		dispatch(renameRequest(id, requestId, null, newname))
		setShowRenameModal(false);
	}

	const onAddRequestConfirm = (name) => {
		dispatch(addRequest(id, name, requestId))
		setShowAddRequestModal(false);
	}
	
	const onDeleteConfirm = (input) => {
		if (input.trim().toLowerCase() === "yes")
		{
			onDelete()
			dispatch(deleteRequest(id, requestId))
			setShowDeleteModal(false)
		}
	}

	const isRequestSelected = (id) => {
		return ((selectedFolder === requestId) && (selectedRequest === id))
	}

	return (<>
		<CustomContainer onClick={() => setFolderOpen(prev => !prev)} color={requestInfo.color}>
			{showRenameModal && (
				<Modal
					title="Rename Folder"
					buttonTitle="Rename"
					onDone={onRenameConfirm}
					onClose={() => setShowRenameModal(false)}
				/>
			)}
			{showAddRequestModal && (
				<Modal
					title="Add Request"
					buttonTitle="Add"
					onDone={onAddRequestConfirm}
					onClose={() => setShowAddRequestModal(false)}
				/>
			)}
			{showDeleteModal && (
				<Modal
					title="Type 'yes' to confirm delete"
					buttonTitle="Delete"
					onDone={onDeleteConfirm}
					onClose={() => setShowDeleteModal(false)}
				/>
			)}
			<div>
				<i className={"bi bi-folder2" + (folderOpen ? "-open" : "")} style={{marginRight: '1rem'}}></i>
				<Name>{requestInfo.name}</Name>
			</div>
			<DropdownBtn onClick={() => setMenuOpen(prev => !prev)}>
				<i
					className="bi bi-caret-down-fill"
				/>
			</DropdownBtn>
			{menuOpen && (
				<DropdownMenu ref={menuEl}>
					<MenuItem onClick={() => { setShowAddRequestModal(true); setMenuOpen(false) }}>
						<i className="bi bi-plus-circle-fill"></i>
						Add Request
					</MenuItem>
					<MenuItem onClick={() => { setShowRenameModal(true); setMenuOpen(false) }}>
						<i className="bi bi-cursor-text"></i>
						Rename
					</MenuItem>
					<MenuDivider />
					<MenuItem red onClick={() => { setShowDeleteModal(true); setMenuOpen(false) }}>
						<i className="bi bi-file-earmark-x-fill"></i>
						Delete
					</MenuItem>
				</DropdownMenu>
			)}
		</CustomContainer>
		<Inner color={requestInfo.color}>
			{folderOpen && (<>
				{requestInfo.requests.map((_, index)=> (
					<RequestItem
						id={id}
						requestId={index}
						folderId={requestId}
						key={index}
						selected={isRequestSelected(index)}
						onClick={() => selectRequest(requestId, index)}
						onDelete={onDelete}
					/>
				))}
			</>)}
		</Inner>
	</>)
}
