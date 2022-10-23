import { gql } from '@apollo/client';

export const ADD_PROFILE = gql`
  mutation addProfile($name: String!, $email: String!, $password: String!) {
    addProfile(name: $name, email: $email, password: $password) {
      token
      profile {
        _id
        name
      }
    }
  }
`;

export const ADD_SCORE = gql`
  mutation addScore($_id: ID!, $score: Int!) {
    addScore(_id: $_id, score: $score) {
      _id
      name
      scores
    }
  }
`;

export const REMOVE_SCORES = gql`
  mutation addScore($_id: ID!, $score: Int!) {
    addScore(_id: $_id, score: $score) {
      _id
      name
      scores
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      profile {
        _id
        name
      }
    }
  }
`;
