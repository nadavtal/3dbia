/**
 * A link to a certain page, an anchor tag
 */

import styled from 'styled-components';
import { theme } from  '../../global-styles'
const TableHeader = styled.div`
  // min-width: bold;
  background-color: ${theme.secondary};
  border-bottom: 1px solid lightgrey;
  align-items: center;
  color: white;
  padding: .5rem;
`;

export default TableHeader;
