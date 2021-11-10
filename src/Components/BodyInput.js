import { useState } from 'react'
import AceEditor from "react-ace";
import { useSelector, useDispatch } from 'react-redux'
import { updateRequest } from '../Actions/ProjectActions'
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-monokai";
import styled from 'styled-components'
import Button from './Button'
import PairInput from './PairInput'
import generateQueryString from '../Utils/generateQueryString';

const TabContainer = styled.div`
	display: flex;
`

const Tab = styled.p`
	font-size: 0.9rem;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0 1rem;
	height: 2.5rem;
	transition-duration: 0s !important;
	border: ${(props) => props.selected ? props.theme.borderStyle : 'rgba(0,0,0,0)'};
	border-top: none;
	border-bottom: ${(props) => !props.selected ? props.theme.borderStyle : 'rgba(0,0,0,0)'};
	cursor: pointer;
`

const TabContainerSpace = styled.div`
	width: 100%;
	height: 2.5rem;
	border-bottom: ${(props) => props.theme.borderStyle};
`

const BottomContainer = styled.div`
	height: calc(100vh - 9rem);
	overflow: scroll;

	* {
		transition-duration: 0s;
	}
`

const Editor = styled(AceEditor)`
	width: 100% !important;
	height: 100% !important;
	font-size: 1rem !important;
`

const TabSection = styled.div`
	padding: 1rem;
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
	width: calc(100vw - 42rem);
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
	position: sticky;
	bottom: 1rem;
	right: 1rem;
	width: 100%;
`

const Tabs = {
	BODY: 1,
	QUERY: 2,
	HEADER: 3
}

export default function BodyInput({id, requestId, folderId}) {
	const [selectedTab, setSelectedTab] = useState(Tabs.BODY)

	const requestState = useSelector(state => {
		if (folderId !== undefined && folderId !== null) {
			return state.project[id].requests[folderId].requests[requestId]
		} else {
			return state.project[id].requests[requestId]
		}
	})

	const dispatch = useDispatch()

	const addQuery = () => {
		let updatedQueries = [...requestState.queries]
		updatedQueries.push({ name: '', value: ''})

		dispatch(updateRequest(id, requestId, folderId, null, null, updatedQueries)) 
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
				<Tab selected={selectedTab === Tabs.BODY} onClick={() => setSelectedTab(Tabs.BODY)}>
					Body
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
				{ selectedTab === Tabs.BODY && (
					<Editor
						mode="json"
						theme="monokai"
						onChange={updateTextBody}
						value={requestState.textBody}
					/>
				)}
				{ selectedTab === Tabs.QUERY && (
					<TabSection>
						<Label>URL PREVIEW</Label>
						<UrlPreview>
							{requestState.url}
							{generateQueryString(requestState.queries)}
						</UrlPreview>
						<QueryList>
							{requestState.queries.map((_, index) => {
								return <PairInput key={index} id={id} requestId={requestId} folderId={folderId} index={index} isQuery />
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
								return <PairInput key={index} id={id} requestId={requestId} folderId={folderId} index={index} />	
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
