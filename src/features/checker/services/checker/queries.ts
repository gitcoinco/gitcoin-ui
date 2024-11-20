import { gql } from "graphql-request";

export const checkerPoolDataQuery = gql`
  query getCheckerPoolData($chainId: Int!, $alloPoolId: String!) {
    pools(filter: { chainId: { equalTo: $chainId }, alloPoolId: { equalTo: $alloPoolId } }) {
      evaluationQuestions {
        questionIndex
        question
      }
      applications(filter: { evaluationsExist: true }) {
        alloApplicationId
        evaluations {
          evaluatorScore
          evaluatorType
          evaluator
          lastUpdatedAt
          evaluationAnswers {
            answer
          }
          metadataCid
        }
      }
    }
  }
`;
