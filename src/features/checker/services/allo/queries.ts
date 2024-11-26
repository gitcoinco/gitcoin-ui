import { gql } from "graphql-request";

export const applicationsForManagerQuery = gql`
  query getApplicationsForManager($chainId: Int!, $roundId: String!) {
    applications(
      first: 1000
      filter: { roundId: { equalTo: $roundId }, chainId: { equalTo: $chainId } }
    ) {
      id
      projectId
      chainId
      roundId
      status
      metadataCid
      metadata
      distributionTransaction
      statusSnapshots
      anchorAddress
      round {
        strategyName
        strategyAddress
      }
      canonicalProject {
        roles {
          address
        }
      }
    }
  }
`;

export const getApplicationByIdQuery = gql`
  query getApplicationById($chainId: Int!, $roundId: String!, $applicationId: String!) {
    application(chainId: $chainId, roundId: $roundId, id: $applicationId) {
      id
      projectId
      chainId
      roundId
      status
      metadataCid
      metadata
      distributionTransaction
      statusSnapshots
      anchorAddress
      round {
        strategyName
        strategyAddress
      }
      canonicalProject {
        roles {
          address
        }
      }
    }
  }
`;

export const getPastApplicationsQueryByApplicationId = gql`
  query getPastApplicationsByApplicationId(
    $chainId: Int!
    $roundId: String!
    $applicationId: String!
  ) {
    applications(
      filter: {
        chainId: { equalTo: $chainId }
        roundId: { equalTo: $roundId }
        id: { equalTo: $applicationId }
      }
    ) {
      project {
        applications {
          id
          roundId
          statusSnapshots
          status
          round {
            roundMetadata
          }
        }
      }
    }
  }
`;
