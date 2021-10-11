import { useState } from 'react'
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-monokai";
import styled from 'styled-components'

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

const Tabs = {
	BODY: 1,
	QUERY: 2,
	HEADER: 3
}

export default function BodyInput({id, requestId}) {
	const [selectedTab, setSelectedTab] = useState(Tabs.BODY)
	const [jsonBody, setJsonBody] = useState('')

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
					<p>query</p>
				)}
				{ selectedTab === Tabs.HEADER && (
					<p>headers</p>
				)}
			</BottomContainer>
			
		</div>
	)
}
