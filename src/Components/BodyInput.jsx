import { useState } from 'react'
import AceEditor from "react-ace";
import { useSelector, useDispatch } from 'react-redux'
import { updateRequest } from '../Actions/ProjectActions'
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-monokai";
import styled from 'styled-components'
import Button from './Button'
import QueryInput from './QueryInput'

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

	* {
		transition-duration: 0s;
	}
`

const Editor = styled(AceEditor)`
	width: 100% !important;
	height: 100% !important;
	font-size: 1rem !important;
`

const QuerySection = styled.div`
	padding: 1rem;
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
`

const QueryList = styled.div`
	height: calc(100% - 6rem);
`

const QuerySectionBottom = styled.div`
	height: 2rem;
	display: flex;
	justify-content: flex-end;
	align-items: center;
` 

const Tabs = {
	BODY: 1,
	QUERY: 2,
	HEADER: 3
}

function generateQueryString(queries) {
	let final = ''
	let queriesFiltered = queries.filter(query => query.name.trim() !== '' && query.value.trim() !== '')

	queriesFiltered.map((query, index) => {
		final += (index !== 0 ? ';' : '') + query.name + '=' + encodeURIComponent(query.value) 
	})

	return final
}

export default function BodyInput({id, requestId}) {
	const [selectedTab, setSelectedTab] = useState(Tabs.BODY)
	const [jsonBody, setJsonBody] = useState('')
	const projectState = useSelector(state => state.project[id])
	const dispatch = useDispatch()
	
	const addQuery = () => {
		let updatedQueries = [...projectState.requests[requestId].queries]	
		updatedQueries.push({ name: '', value: ''})

		dispatch(updateRequest(id, requestId, null, null, updatedQueries)) 
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
						onChange={(value) => setJsonBody(value)}
						value={jsonBody}
				  	/>
				)}
				{ selectedTab === Tabs.QUERY && (
					<QuerySection>
						<Label>URL PREVIEW</Label>
						<UrlPreview>
							{projectState.requests[requestId].url}?
							{generateQueryString(projectState.requests[requestId].queries)}
						</UrlPreview>
						<QueryList>
							{projectState.requests[requestId].queries.map((_, index) => {
								return <QueryInput id={id} requestId={requestId} queryIndex={index} />	
							})}
						</QueryList>
						<QuerySectionBottom>
							<Button onClick={() => addQuery()}>Add</Button>
						</QuerySectionBottom>
					</QuerySection>
				)}
				{ selectedTab === Tabs.HEADER && (
					<p>headers</p>
				)}
			</BottomContainer>
			
		</div>
	)
}
