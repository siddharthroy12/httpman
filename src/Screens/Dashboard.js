import { useState } from 'react'
import Container from '../Components/Container'
import Project from '../Components/Project'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import Modal from '../Components/Modal'
import { useDispatch } from 'react-redux'
import { addProject } from '../Actions/ProjectActions'
import searchString from '../Utils/searchString'

const Header = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`

const HeaderText = styled.h2`
	font-size: 1.2rem;
	font-weight: 400;
`

const HeaderActions = styled.div`
	display: flex;
	align-items: center;

	> * {
		margin-left: 1rem;
	}
`

const CreateButton = styled.button`
	border: none;
	display: inline-block;
	border-radius: 3px;
	background-color: #9D92DD;
	color: white;
	padding: 0.5rem 1rem;

	:hover {
		background-color: #7F71CC;
	}
`

const FilterBox = styled.div`
	border: ${(props) => props.theme.borderStyle};
	border-radius: 3px;
	background-color: #272727;
	width: 20rem;
	display: flex;
	align-items: center;
`

const FilterInput = styled.input`
	border: none;
	background-color: inherit;
	color: inherit;
	padding: 0.5rem 1rem;
	width: 100%;
`

const StatusBar = styled.div`
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	padding: 0.5rem 1rem;
	border-top: ${props => props.theme.borderStyle};
	font-size: 0.9rem;
	display: flex;
	justify-content: space-between;
`

const Projects = styled.div`
	margin-top: 1rem;
	display: flex;

	> * {
		margin-right: 1rem;
		margin-bottom: 1rem;
	}
`

const Center = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;

	border: ${props => props.theme.borderStyle};
	border-radius: 3px;
	background-color: #272727;
	padding: 1rem;
`

export default function Dashboard() {
	const projects = useSelector(state => state.project)
	const [filter, setFilter] = useState('')
	const [showAddProjectModal, setShowAddProjectModal] = useState(false)
	const dispatch = useDispatch()

	const onModalCreate = (name) => {
		dispatch(addProject(name))
		setShowAddProjectModal(false)
	}

	return (
		<Container>
			{showAddProjectModal && (
				<Modal
					title="Create New Project"
					buttonTitle="Create"
					onDone={onModalCreate}
					onClose={() => setShowAddProjectModal(false)}
				/>
			)}
			<Header>
				<HeaderText>
					Dashboard
				</HeaderText>
				<HeaderActions>
					<FilterBox>
						<FilterInput type="text" placeholder="Filter" value={filter} onChange={(e) => setFilter(e.target.value)}/>
						<i
							className="bi bi-search"
							style={{
								marginRight: '1rem',
								color: 'rgb(121, 121, 121)'
							}}
						/>
					</FilterBox>
					<CreateButton onClick={() => setShowAddProjectModal(true)}>
						Create
					</CreateButton>
				</HeaderActions>
			</Header>
			<Projects>
				{Object.keys(projects).map(id => {
					if (filter.trim() !== '') {
						if (!searchString(filter, projects[id].name)) {
							return null
						}
					}

					return (
						<Project
							key={id}
							id={id}
							name={projects[id].name}
						/>
					)
				})}
			</Projects>
			{Object.keys(projects).length === 0 &&  (<Center>
				Start by creating a new project.
			</Center>)}
			<StatusBar>
				<p>{Object.keys(projects).length} Projects</p>
				<p>Version: 1.0.0</p>
			</StatusBar>
		</Container>
	)
}
