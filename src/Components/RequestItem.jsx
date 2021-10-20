import { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { 
	deleteRequest, renameRequest, pinRequest, duplicateRequest
} from '../Actions/ProjectActions'
import styled from 'styled-components'
import Modal from './Modal'

const Container = styled.div`
	padding: 0.5rem 1rem;

	transition-duration: 0ms !important;

	${(props) => props.selected ? 'background-color: rgba(255,255,255, 0.1);' : null}

	:hover {
		background-color: rgba(255,255,255, 0.1);
		transition-duration: 0ms !important;

		> button {
			display: block;
		}

		> p {
			display: none;
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

const PinnedIcon = styled.p`
	color: #B6B6B6;
	font-size: 0.9rem;

	:hover {
		display: none;
	}
`

const DropdownMenu = styled.div`
	position: absolute;
	right: -10px;
	top: 2rem;
	border: ${(props) => props.theme.borderStyle};
	background-color: #2A2A2A;
	z-index: 5;
	padding: 0.2rem 0;
	border-radius: 3px;
	display: flex;
	flex-direction: column;
	width: 10rem;
`

const MenuDivider = styled.hr`
	border: none;
	border-bottom: 1px solid #3e3e3e;
	margin: 0.2rem 0;
`

const MenuItem = styled.button`
	border: none;
	background-color: unset;
	color: ${(props) => props.red ? '#F45866' : 'white'};
	padding: 0.5rem 1rem;
	width: 100%;
	text-align: start;

	> i {
		margin-right: 1rem;
	}

	:hover {
		background-color: rgba(225,225,225, 0.1);
	}
`

export default function RequestItem({ id, requestId, selected, onClick }) {
	const [menuOpen, setMenuOpen] = useState(false)
	const menuEl = useRef(null);
	const requestInfo = useSelector(state => state.project[id].requests[requestId])
	const [showRenameItemModal, setShowRenameItemModal] = useState(false)
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

	const onModalRename = (newname) => {
		dispatch(renameRequest(id, requestId, newname))
		setShowRenameItemModal(false)
	}

	return (
		<Container onClick={onClick} selected={selected}>
			{showRenameItemModal && (
				<Modal
					title="Rename Request"
					buttonTitle="Rename"
					onDone={onModalRename}
					onClose={() => setShowRenameItemModal(false)}
				/>
			)}
			<div>
				<Method method={requestInfo.method}>{requestInfo.method}</Method>
				<Name>{requestInfo.name}</Name>
			</div>
			{requestInfo.pinned && (<PinnedIcon>
				<i
					className="bi bi-pin-fill"
				/>
			</PinnedIcon>)}
			<DropdownBtn onClick={() => setMenuOpen(prev => !prev)}>
				<i
					className="bi bi-caret-down-fill"
				/>
			</DropdownBtn>
			{menuOpen && (
				<DropdownMenu ref={menuEl}>
					<MenuItem onClick={() => setShowRenameItemModal(true)}>
						<i class="bi bi-cursor-text"></i>
						Rename
					</MenuItem>
					<MenuItem onClick={() => { dispatch(duplicateRequest(id, requestId)); setMenuOpen(false) }}>
						<i class="bi bi-files"></i>
						Duplicate
					</MenuItem>
					<MenuItem onClick={() => { dispatch(pinRequest(id, requestId)); setMenuOpen(false) }}>
						<i class="bi bi-pin-angle"></i>
						{requestInfo.pinned ? 'Unpin' : 'Pin'}
					</MenuItem>
					<MenuDivider />
					<MenuItem red onClick={() => dispatch(deleteRequest(id, requestId))}>
						<i class="bi bi-file-earmark-x-fill"></i>
						Delete
					</MenuItem>
				</DropdownMenu>
			)}
		</Container>
	)
}
