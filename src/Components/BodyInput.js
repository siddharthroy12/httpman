import { useState } from 'react'
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

const Tabs = {
	BODY: 1,
	QUERY: 2,
	HEADER: 3
}

export default function BodyInput({id, requestId}) {
	const [selectedTab, setSelectedTab] = useState(Tabs.BODY)
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
		</div>
	)
}
