import { gql } from "@apollo/client";

export const GET_FAVORITE_TEAMS = gql`
  query {
    getFavorite(id: 1) {
      teamsInfo {
        name
        id
        crestUrl
        tla
      }
    }
  }
`;

export const UPDATE_FAVORITE_TEAM = gql`
  mutation updateFavoriteTeam($userId: Int!, $teamId: Int!) {
    removeFromFavorite(id: $userId, teams: [$teamId], matches: []) {
      uId
      teams
      matches
    }
  }
`;
export const GET_FAVORITE_MATCHES = gql`
  query {
    getFavorite(id: 1) {
      teamsInfo {
        name
        id
        crestUrl
        tla
      }
      matchesInfo {
        id
        utcDate
        homeTeam {
          name
        }
        awayTeam {
          name
        }
        score {
          winner
        }
      }
    }
  }
`;

export const UPDATE_FAVORITE_MATCH = gql`
  mutation updateFavoriteTeam($userId: Int!, $matchId: Int!) {
    removeFromFavorite(id: $userId, teams: [], matches: [$matchId]) {
      uId
      teams
      matches
    }
  }
`;

export const GET_LEAGUES = gql`
  query leagues {
    leagues {
      id
      name
      emblemUrl
    }
  }
`;
export const GET_MATCHES = gql`
  query getMatches($leagueId: Int!) {
    getLeague(id: $leagueId) {
      id
      name
      emblemUrl
      matches {
        id
        utcDate
        homeTeam {
          name
        }
        awayTeam {
          name
        }
      }
    }
  }
`;

export const UPDATE_MATCH = gql`
  mutation updateFavoriteMatch($userId: Int!, $matchId: Int!) {
    updateFavorite(id: $userId, teams: [], matches: [$matchId]) {
      uId
      teams
      matches
    }
  }
`;

export const GET_STANDING = gql`
  query getLeague($leagueId: Int!) {
    getLeague(id: $leagueId) {
      id
      name
      emblemUrl
      standings {
        table {
          team {
            id
            name
          }
          points
          won
          lost
          draw
        }
      }
      matches {
        homeTeam {
          name
        }
        awayTeam {
          name
        }
      }
    }
  }
`;
export const UPDATE_TEAM = gql`
  mutation updateFavoriteTeam($userId: Int!, $teamId: Int!) {
    updateFavorite(id: $userId, teams: [$teamId], matches: []) {
      uId
      teams
      matches
    }
  }
`;
