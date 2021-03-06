import React from 'react';
import styled from 'styled-components';

import CenterContainer from './centerContainer.component';

const LoadingText = styled.h2`
  font-family: 'Muli', sans-serif;
`;

const Loader = () => {
  return (
    <CenterContainer>
      <LoadingText>Loading...</LoadingText>
    </CenterContainer>
  );
};

export default Loader;
