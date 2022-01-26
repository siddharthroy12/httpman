import { useState, useRef, useEffect } from 'react'
import AceEditor from "react-ace";
import { useSelector, useDispatch } from 'react-redux'
import { updateRequest } from '../Actions/ProjectActions'
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/mode-yaml";
import "ace-builds/src-noconflict/mode-xml";
import "ace-builds/src-noconflict/mode-plain_text";
import "ace-builds/src-noconflict/theme-monokai";
import styled from 'styled-components'
import Button from './Button'
import PairInput from './PairInput'
import generateQueryString from '../Utils/generateQueryString';

const TabContainer = styled.div`
	display: flex;
`

const Tab = styled.div`
	font-size: 0.9rem;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0 1rem;
	height: 2.5rem;
	transition-duration: 0s !important;
	border: 1px solid rgba(0, 0, 0, 0);
	${(props) => props.selected ?
			`
				border-left: ${props.theme.borderStyle};
				border-right: ${props.theme.borderStyle};
			`:
			`
				border-bottom: ${props.theme.borderStyle};
			`
	}
	cursor: pointer;
`

const TabContainerSpace = styled.div`
	width: 100%;
	height: 2.5rem;
	border-bottom: ${(props) => props.theme.borderStyle};
`

const BottomContainer = styled.div`
	height: calc(100vh - 9rem);
	position: relative;

	* {
		transition-duration: 0s;
	}
`

const Editor = styled(AceEditor)`
	width: 100% !important;
	height: 100% !important;
	font-size: 0.9rem !important;
`

const TabSection = styled.div`
	padding: 1rem;
	padding-bottom: 4rem;
	overflow: scroll;
	height: 100%;
`

const Label = styled.p`
	font-size: 0.8rem;
	color: gray;
`

const UrlPreview = styled.div`
	border: ${(props) => props.theme.borderStyle};
	padding: 1rem;
	background-color: #282828;
	margin-bottom: 0.5rem;
	overflow-x: auto;
	white-space: nowrap;
	width: 100%;
`

const QueryList = styled.div`
	height: calc(100% - 8rem);
`

const HeaderList = styled.div`
`

const TabSectionBottom = styled.div`
	height: 2rem;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	position: absolute;
	bottom: 1rem;
	right: 1rem;
	width: 100%;
`
const BodyTypeMenu = styled.div`
	position: absolute;
	border: ${(props) => props.theme.borderStyle};
	background-color: #2A2A2A;
	border-radius: 3px;
	top: 40px;
	left: 0px;
	width: 13rem;
	padding: 0.2rem 0;
	z-index: 5;
`
const MenuItem = styled.button`
	border: none;
	background-color: unset;
	color: white;
	padding: 0.5rem 1rem;
	width: 100%;
	text-align: start;

	:hover {
		background-color: rgba(225,225,225, 0.1);
	}
`

const Tabs = {
	BODY: 1,
	QUERY: 2,
	HEADER: 3
}

export default function BodyInput({id, requestId, folderId, binaryFileHandler}) {
	const [selectedTab, setSelectedTab] = useState(Tabs.BODY)
	const [bodyTypeSelectMenuShown, setBodyTypeSelectMenuShown] = useState(false)
	const bodyTypeMenuEl = useRef(null)

	const requestState = useSelector(state => {
		if (folderId !== undefined && folderId !== null) {
			return state.project[id].requests[folderId].requests[requestId]
		} else {
			return state.project[id].requests[requestId]
		}
	})

	const setBodyType = (type) => {
		setBodyTypeSelectMenuShown(false)
		dispatch(updateRequest(id, requestId, folderId, null, null, null, null, type))
	}

	const handleClickOutside = (event) => {
		if (bodyTypeMenuEl.current && !bodyTypeMenuEl.current.contains(event.target)) {
			setBodyTypeSelectMenuShown(false)
		}
	};

	useEffect(() => {
		document.addEventListener('click', handleClickOutside, true);
		return () => {
			document.removeEventListener('click', handleClickOutside, true);
		};
	})

	const getBodyTypeName = (type) => {
		switch (type) {
			case "multipart":
				return "Multipart Form"
			case "form":
				return "Form URL Encoded"
			case "json":
				return "JSON"
			case "xml":
				return "XML"
			case "yaml":
				return "YAML"
			case "plain_text":
				return "Plain Text"
			default:
				return "Body"
		}
	}

	const dispatch = useDispatch()

	const addQuery = () => {
		let updatedQueries = [...requestState.queries]
		updatedQueries.push({ name: '', value: ''})

		dispatch(updateRequest(id, requestId, folderId, null, null, updatedQueries))
	}

	const addForm = () => {
		let updatedForms = [...requestState.structuredBody]
		updatedForms.push({ name: '', value: ''})

		dispatch(updateRequest(id, requestId, folderId, null, null, null, null, null, null, updatedForms))
	}

	const addHeader = () => {
		let updatedHeaders = [...requestState.headers]
		updatedHeaders.push({ name: '', value: ''})

		dispatch(updateRequest(id, requestId, folderId, null, null, null, updatedHeaders))
	}

	const updateTextBody = (value) => {
		dispatch(updateRequest(id, requestId, folderId, null, null, null, null, null, value))
	}
	
	return (
		<div>
			<TabContainer>
				<Tab selected={selectedTab === Tabs.BODY} onClick={() => setSelectedTab(Tabs.BODY)} style={{position: 'relative'}}>
					<p style={{width: "max-content"}}>{getBodyTypeName(requestState.bodyType)}</p>
					<i className="bi bi-caret-down-fill" style={{marginLeft:'10px'}} onClick={() => setBodyTypeSelectMenuShown(p => !p)}/>
					{bodyTypeSelectMenuShown && (
						<BodyTypeMenu ref={bodyTypeMenuEl}>
							<MenuItem onClick={() => setBodyType("multipart")}>
								Multipart Form
							</MenuItem>
							<MenuItem onClick={() => setBodyType("form")}>
								Form URL Encoded
							</MenuItem>
							<MenuItem onClick={() => setBodyType("json")}>
								JSON
							</MenuItem>
							<MenuItem onClick={() => setBodyType("xml")}>
								XML
							</MenuItem>
							<MenuItem onClick={() => setBodyType("yaml")}>
								YAML
							</MenuItem>
							<MenuItem onClick={() => setBodyType("plain_text")}>
								Plain Text
							</MenuItem>
						</BodyTypeMenu>
					)}
				</Tab>
				<Tab selected={selectedTab === Tabs.QUERY} onClick={() => setSelectedTab(Tabs.QUERY)}>
					Query
				</Tab>
				<Tab selected={selectedTab === Tabs.HEADER} onClick={() => setSelectedTab(Tabs.HEADER)}>
					Header
				</Tab>
				<TabContainerSpace />
			</TabContainer>
			<BottomContainer>
				{ selectedTab === Tabs.BODY && (<>
					{requestState.bodyType === "form" || requestState.bodyType === "multipart" ? (
						<TabSection>
							{requestState.structuredBody.map((_, index) => {
								return <PairInput key={index} id={id} requestId={requestId} folderId={folderId} index={index} isQuery="form" />
							})}
							<TabSectionBottom>
								<Button onClick={() => addForm()}>Add</Button>
							</TabSectionBottom>
						</TabSection>
					) : requestState.bodyType === "binary" ? (
						<>
							<input type="file" label="Upload File" onChange={(event) => binaryFileHandler(event.target.files)}/>
						</>
					) : (
					<Editor
						mode={requestState.bodyType}
						theme="monokai"
						onChange={updateTextBody}
						value={requestState.textBody}
					/>)
					}
				</>)}
				{ selectedTab === Tabs.QUERY && (
					<TabSection>
						<Label>URL PREVIEW</Label>
						<UrlPreview>
							{requestState.url}
							{generateQueryString(requestState.queries)}
						</UrlPreview>
						<QueryList>
							{requestState.queries.map((_, index) => {
								return <PairInput key={index} id={id} requestId={requestId} folderId={folderId} index={index} isQuery="query" />
							})}
						</QueryList>
					</TabSection>
				)}
				{ selectedTab === Tabs.QUERY && (
					<TabSectionBottom>
						<Button onClick={() => addQuery()}>Add</Button>
					</TabSectionBottom>
				)}
				{ selectedTab === Tabs.HEADER && (
					<TabSection>
						<HeaderList>
							{requestState.headers.map((_, index) => {
								return <PairInput key={index} id={id} requestId={requestId} folderId={folderId} index={index} isQuery="header" />
							})}
						</HeaderList>
					</TabSection>
				)}
				{ selectedTab === Tabs.HEADER && (
					<TabSectionBottom>
						<Button onClick={() => addHeader()}>Add</Button>
					</TabSectionBottom>
				)}
				
			</BottomContainer>
		</div>
	)
}
