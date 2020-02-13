import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';

import GenreGraph from '../components/genreGraph.component';
import actions from '../actions';

const UserHeader = styled.div`
  display: flex;
  width: 98%;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  background-color: white;
  margin: 1%;
  border-radius: 10px;
`;

const UserDisplayNameHeader = styled.h4`
  font-family: 'Muli', sans-serif;
  font-weight: 300;
  color: black;
  margin: 0;
`;

const UserProfilePicture = styled.img`
  border-radius: 50%;
  width: 50px;
  height: 50px;
  margin: 1.5%;
`;

const Title = styled.h2`
  font-family: 'Muli', sans-serif;
  font-weight: 700;
  color: black;
  margin: 0;
`;

const UserProfileText = styled.div`
  display: flex;
  flex-direction: column;
`;

const GenreGraphPage = ({ actions, artistGraph, user, match }) => {
  const history = useHistory();
  const { spotifyUserId } = match.params;

  useEffect(() => {
    if (spotifyUserId && !user) {
      actions.fetchSpotifyData({ spotifyUserId });
    }
  }, [spotifyUserId, actions, user]);

  if (!artistGraph || !user) return 'Loading...';

  const userData = user.toJS();

  // update url if coming from auth
  if (!spotifyUserId) {
    history.push(`/graph/${userData.id}`);
  }

  return (
    <div>
      <UserHeader>
        <UserProfilePicture src={userData.profilePicture} />
        <UserProfileText>
          <Title>Music Graph</Title>
          <UserDisplayNameHeader>{userData.displayName}</UserDisplayNameHeader>
        </UserProfileText>
      </UserHeader>
      <GenreGraph artistGraph={artistGraph} style />;
    </div>
  );
};

const mapStateToProps = state => {
  return {
    accessToken: state.get('accessToken'),
    artistGraph: state.get('artistGraph'),
    user: state.get('user')
  };
}; //eslint-disable-line
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
}); //eslint-disable-line

export default connect(mapStateToProps, mapDispatchToProps)(GenreGraphPage);
