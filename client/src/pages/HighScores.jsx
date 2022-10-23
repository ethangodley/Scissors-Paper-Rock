import React from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import ScoreList from '../components/ScoreList';
import { ADD_SCORE } from '../utils/mutations';
import { reactLocalStorage } from 'reactjs-localstorage';

const HighScores =() => {
  const { loading, data } = useQuery(QUERY_ME, {
    fetchPolicy: "no-cache"
  });
  const id = data?.me._id;
  const scoresList = data?.me.scores || [];
  return (
    <div>
      <h2 className="card-header center">
        Your high scores are below:
      </h2>
      <div className="col-12 col-md-10 my-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div className='center'>
              <ScoreList
                id={id}
                scores={scoresList}
              />
            </div>
          )}
        </div>
    </div>
  );
};

export default HighScores;