import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '../index';
import { StyledHeader, StyledLink } from './SharedLayout.styled';

const SharedLayout = () => {
  return (
    <Box>
      <StyledHeader>
        <nav>
          <StyledLink to="">Home</StyledLink>
          <StyledLink to="movies">Movies</StyledLink>
        </nav>
      </StyledHeader>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </Box>
  );
};

export default SharedLayout;
