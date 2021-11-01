import { useState } from 'react'
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
  border-bottom: ${(props) => props.theme.borderStyle}}
`

const ResponseSection = styled.div`
  padding: 1rem;
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

export default function Response({ response }) {
  const [selectedTab, setSelectedTab] = useState(1)
  console.log(response)

  return (<>
    <Tabs>
      <Tab onClick={() => setSelectedTab(1)} selected={selectedTab === 1}>Response</Tab> 
      <Tab onClick={() => setSelectedTab(2)} selected={selectedTab === 2}>Headers</Tab> 
      <TabLeftSpace />
    </Tabs>
    {selectedTab === 1 && (<>
      <ResponseSection>
        <p> {JSON.stringify(response.data)} </p>
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
