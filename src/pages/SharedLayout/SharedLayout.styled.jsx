import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const StyledLink = styled(NavLink)`
  padding: 5px;
  text-decoration: none;
  font-size: 24px;
  font-weight: 500;
  line-height: 1.5;
  color: #212121;
  :not(:last-child) {
    margin-right: 20px;
  }
  &.active {
    color: #c90505;
  }
`;

export const StyledHeader = styled.header`
  padding: 15px 25px;
  box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.5);
`;
