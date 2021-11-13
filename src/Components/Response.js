import { useState } from 'react'
import { js as beautifyJs, html as beautifyHtml, css as beautifyCss } from 'js-beautify'
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/theme-monokai";

import styled from 'styled-components'

const Tabs = styled.div`
	display: flex;
`

const Tab = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0 1rem;
	height: 2.5rem;  
	transition-duration: 0ms !important;
	border-bottom: ${(props) => !props.selected ? props.theme.borderStyle : 'none'}; 
	border-left: ${(props) => props.selected ? props.theme.borderStyle : 'none'};
	border-right: ${(props) => props.selected ? props.theme.borderStyle : 'none'};
`

const TabLeftSpace = styled.div`
	height: 2.5rem;
	width: 100%;
	border-bottom: ${(props) => props.theme.borderStyle}};
`

const ResponseSection = styled.div`
	height: calc(100vh - 9rem);
	padding: 1rem;

	* {
		transition-duration: 0s;
	}
`

const HeadersSection = styled.div`
	padding: 1rem;

	> table tr:nth-child(even) {
		background-color: #393939;
	}

	> table tr:nth-child(odd) {
		background-color: #292929;
	}
	
	> table td {
		padding: 0.5rem;
		width: 50%;
	}
`

const Editor = styled(AceEditor)`
	width: 100% !important;
	height: 100% !important;
	font-size: 0.9rem !important;
`

function getFileType(response) {
	const contentType = response.headers['content-type']

	if (contentType.includes('json')) {
		return 'json'
	} else if (contentType.includes('javascript')) {
		return 'javascript'
	} else if (contentType.includes('html')) {
		return 'html'
	} else if (contentType.includes('css')) {
		return  'css'
	} else {
		return 'xml'
	}
}

function prettify(response) {
	const responseString = getFileType(response) === 'json' ? JSON.stringify(response.data) : response.data
	const config = { indent_size: 2, space_in_empty_paren: true }

	if (getFileType(response) === 'json' || getFileType(response) === 'javascript') {
		return beautifyJs(responseString, config)
	} else if (getFileType(response) === 'html') {
		return beautifyHtml(responseString, config)
	} else if (getFileType(response) === 'css') {
		return beautifyCss(responseString, config)
	} else {
		return responseString
	}
}

export default function Response({ response }) {
	const [responseString, setResponseString] = useState(
		getFileType(response) === 'json' ? JSON.stringify(response.data) : response.data
	)
	const [selectedTab, setSelectedTab] = useState(1)

	return (<>
		<Tabs>
			<Tab onClick={() => setSelectedTab(1)} selected={selectedTab === 1}>Response</Tab> 
			<Tab onClick={() => setSelectedTab(2)} selected={selectedTab === 2}>Headers</Tab> 
			<TabLeftSpace />
		</Tabs>
		{selectedTab === 1 && (<>
			<ResponseSection>
				<Editor
						mode={getFileType(response)}
						theme="monokai"
						cursorStart={1}
						readOnly
						value={prettify(response)}
					/>
			</ResponseSection>
		</>)}
		{selectedTab ===2 && (
			<HeadersSection>
				<table>
					<tbody>
					{Object.keys(response.headers).map(key => (
						<tr key={key}>
							<td> { key } </td>
							<td> { response.headers[key] } </td>
						</tr>
					))}
					</tbody>
				</table>
			</HeadersSection>
		)}
	</>)
}
