import Container from './Container'

import styled from 'styled-components'

const Wrapper = styled.header`
	border-bottom: ${(props) => props.theme.borderStyle};
`

const HeaderText = styled.h1`
	font-size: 1rem;
	letter-spacing: 1px;
	font-weight: 500;
`

export default function Header() {
	return (
		<Wrapper>
			<Container>
				<HeaderText>Httpman</HeaderText>
			</Container>
		</Wrapper>
	)
}
