import Container from './Container'
import styled from 'styled-components'
import { useLocation } from 'react-router'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

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

function getProjectIndex(str) {
	return Number(str.replace('/project/', ''))
}

export default function Header() {
	const location = useLocation()
	const projects = useSelector(state => state.project)
	const pathIsProject = location.pathname.startsWith('/project/')
	const projectName = pathIsProject ? projects[getProjectIndex(location.pathname)].name : ''

	return (
		<Wrapper>
			<Container>
				<Link to='/'>
					<HeaderText>HTTPMAN </HeaderText>
				</Link>
				{ pathIsProject && (<>
					<Divider><i class="bi bi-caret-right-fill"></i></Divider>	
					<p> { pathIsProject && projectName } </p>
				</>)}
			</Container>
		</Wrapper>
	)
}
