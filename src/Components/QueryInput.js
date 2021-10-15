import styled from 'styled-components'

const Container = styled.div`
	display: flex;
`

export default function QueryInput({id, requestId, queryIndex}) {
	return (
		<Container>
			<input type="text" />
			<input type="text" />
		</Container>
	)
}
