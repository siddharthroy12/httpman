import styled from 'styled-components'

const Button = styled.button`
	border: ${(props) => props.theme.borderStyle};
	border-radius: 3px;
	border-width: 2px;
	padding: 0.5rem;
	background-color: unset;
	color: #DDDDDD;

	:hover {
		background-color: rgba(255, 255, 255, 0.05);	
	}

	:active {
		background-color: rgba(255, 255, 255, 0.1);	
	}
`

export default Button
