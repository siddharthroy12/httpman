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
  border-bottom: ${(props) => !props.selected ? props.theme.borderStyle : 'none'} 
`

const TabLeftSpace = styled.div`
  height: 2.5rem;
  width: 100%;
  border-bottom: ${(props) => props.theme.borderStyle}}
`

export default function Response({ response }) {
  const [selectedTab, setSelectedTab] = useState(1)
  return (<>
    <Tabs>
      <Tab>Response</Tab> 
      <Tab>Headers</Tab> 
      <TabLeftSpace />
    </Tabs>
  </>)
}
