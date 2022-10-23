import React from 'react';
import { useMutation } from '@apollo/client';
import { reactLocalStorage } from 'reactjs-localstorage';
import { ADD_SCORE } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries';
import Auth from '../../utils/auth';
import { useRouteLoaderData } from 'react-router-dom';

const ScoreList = ({id, scores}) => {
  const [addScore, { error }] = useMutation(ADD_SCORE, { 
    update(cache, { data: {addScore} }) {
      try {
              // update me object's cache
        cache.writeQuery({
          query: QUERY_ME,
          data: { _id: id, scores: [addScore, ...scores] },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  const handleAddScore = async (score) => {
    console.log(score);
    score = parseInt(score);

      const { data } = await addScore({
        variables: { _id: id, score: score },
      });
      console.log(score);
      window.location.reload();
  };
  if (!scores.length) {
    return <h3>No Scores Yet</h3>;
  }

  return (
    <div>
      <div className="flex-row justify-space-between my-4">
        {scores &&
          scores.map((score) => (
            <div key={score} className="col-12 col-xl-6">
              <div className="card mb-3">
                <h4 className="card-header bg-dark text-light p-2 m-0 display-flex align-center">
                  <span>{score}</span>
                </h4>
              </div>
            </div>
          ))}
          <button className="btn"
            onClick={() => handleAddScore(reactLocalStorage.get('Streak'))}
          >
          Add Score of {reactLocalStorage.get('Streak')}
          </button>
      </div>
      {error && (
        <div className="my-3 p-3 bg-danger text-white">{error.message}</div>
      )}
    </div>
  );
};

export default ScoreList;
