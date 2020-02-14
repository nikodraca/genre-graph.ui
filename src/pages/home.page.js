import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { authUser } from '../utils/auth';

const Container = styled.div`
  display: flex;
  margin: 3%;
  align-items: flex-start;

  @media (max-width: 641px) {
    flex-direction: column;
    margin: 2%;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;

  @media (max-width: 641px) {
    width: 100%;
  }
`;

const BigHeader = styled.h1`
  font-size: 10em;
  font-family: 'Muli', sans-serif;
  font-weight: 900;
  display: inline-block;
  padding-bottom: 25px;
  position: relative;

  &:before {
    content: '';
    position: absolute;
    width: 50%;
    height: 1px;
    bottom: 0;
    left: 0;
    border-bottom: 25px solid #ec534c;
  }

  @media (max-width: 641px) {
    font-size: 5em;
    margin-bottom: 5%;
  }
`;

const Paragraph = styled.p`
  padding: 5%;
  font-family: 'Roboto Mono', monospace;
  color: #393d3f;

  @media (max-width: 641px) {
    padding: 1%;
  }
`;

const FlatButton = styled.button`
  width: 200px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  font-family: 'Roboto Mono', monospace;
  font-size: 1em;
  border: none;

  @media (max-width: 641px) {
    width: 100%;
    height: 50px;
    justify-content: flex-start;
    padding-left: 10%;
  }
`;

const SpotifyIcon = styled.img`
  height: 25px;
  width: 25px;
  align-self: center;

  @media (max-width: 641px) {
    margin-right: 10%;
  }
`;

const UndecoratedLink = styled(Link)`
  text-decoration: none;
  color: #393d3f;
`;

const HomePage = () => {
  let spotifyAccessToken = localStorage.getItem('spotifyAccessToken');
  const spotifyUserId = localStorage.getItem('spotifyUserId');

  return (
    <Container>
      <BigHeader>Music Graph</BigHeader>
      <Column>
        <Paragraph>
          Visualize your taste in music. <u>Music Graph</u> uses your Spotify data to generate a graph of your top
          artists and how they relate to each other, creating a map of your taste in music. Artist with common genres
          are linked together. Artists that are floating alone have no related artists - these are real deep cuts.
        </Paragraph>
        <Paragraph>
          Clicking on an artist will highlight the related artists. Scrolling or pinching will zoom in. Feel free to
          zoom and in and move around - get a real feel for your taste in music.
        </Paragraph>
        <Paragraph>
          {spotifyUserId && spotifyAccessToken ? (
            <FlatButton style={{ backgroundColor: '#77ba99' }}>
              <UndecoratedLink to={`/graph/${spotifyUserId}`}>Start</UndecoratedLink>
            </FlatButton>
          ) : (
            <FlatButton
              style={{ backgroundColor: '#1db954' }}
              onClick={() => {
                authUser();
              }}
            >
              <SpotifyIcon src="img/spotify.png" />
              Sign In
            </FlatButton>
          )}
        </Paragraph>
      </Column>
    </Container>
  );
};
export default HomePage;
