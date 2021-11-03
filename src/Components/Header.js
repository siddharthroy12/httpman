import { useState } from 'react'
import Container from './Container'
import styled, { css } from 'styled-components'
import { useLocation } from 'react-router'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import About from './About'

const Wrapper = styled.header`
	border-bottom: ${(props) => props.theme.borderStyle};
	height: 3.5rem;
	display: flex;
	align-items: center;

	> * {
		display: flex;
	}
`

const HeaderText = styled.h1`
	font-size: 1rem;
	font-decortion: none;
	letter-spacing: 1px;
	font-weight: 500;
	color: #8E84CB;
`

const Divider = styled.p`
	margin: 0 0.5rem;
`

const Spacer = styled.div`
  width: 100%;
`

const RightSide = styled.div`
  display: flex;

  > * {
    margin-left: 1rem;
  }
`

const ButtonStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;

  --size: 2rem;

  height: var(--size);
  width: var(--size);
  border: 1px solid;
  border-color: rgba(0,0,0,0);
  color: white;
  font-size: 1.5rem;
  
  :hover {
    border-color: #ACA0F2;
  }
`

const SourceLink = styled.a`
  ${ButtonStyle}
`

const AboutButton = styled.button`
  ${ButtonStyle}
  background-color: unset;
  cursor: pointer;
`

function getProjectIndex(str) {
	return Number(str.replace('/project/', ''))
}

export default function Header() {
	const location = useLocation()
	const projects = useSelector(state => state.project)
	const pathIsProject = location.pathname.startsWith('/project/')
  const [showAbout, setShowAbout] = useState(false)
	const projectName = pathIsProject ? projects[getProjectIndex(location.pathname)].name : ''

  return (<>
    {showAbout && <About onClose={() => setShowAbout(false)} />}
		<Wrapper>
      <Container style={{width:'100%', padding: '0 1rem', alignItems: 'center'}}>
				<Link to='/'>
					<HeaderText>HTTPMAN </HeaderText>
				</Link>
				{ pathIsProject && (<>
					<Divider><i className="bi bi-caret-right-fill"></i></Divider>	
					<p> { pathIsProject && projectName } </p>
				</>)}
        <Spacer />
        <RightSide>
          <SourceLink href="https://github.com/siddharthroy12/httpman" target="_blank">
            <i className="bi bi-github" style={{width: '24px', height: '28px'}}></i>
          </SourceLink>
          <AboutButton onClick={() => setShowAbout(prev => !prev)}>
            <i className="bi bi-info-circle"></i>
          </AboutButton>
        </RightSide>
			</Container>
		</Wrapper>
  </>)
}
