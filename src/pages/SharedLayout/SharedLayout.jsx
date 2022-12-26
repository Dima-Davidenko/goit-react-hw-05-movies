import React, { Suspense } from 'react';
import { ColorRing } from 'react-loader-spinner';
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
      <Suspense
        fallback={
          <ColorRing
            visible={true}
            height="150"
            width="150"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="spinner"
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
          />
        }
      >
        <Outlet />
      </Suspense>
    </Box>
  );
};

export default SharedLayout;
