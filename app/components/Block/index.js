/**
 * A link to a certain page, an anchor tag
 */

import styled from 'styled-components';

const Block = styled.div`
width: ${props => props.width ? `${props.width}rem` : "10rem"};
text-align: center;
`

export default Block;
