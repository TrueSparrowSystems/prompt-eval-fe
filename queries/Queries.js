import { gql } from "@apollo/client";

class Queries {
  get experimentList() {
    return gql`
      query GetExperiments {
        experimentList {
          id
          name
          description
          createdAt
          updatedAt
          dynamicVars
        }
      }
    `;
  }

  get createExperiment() {
    return gql`
      mutation CreateExperiment($name: String!, $description: String!) {
        createExperiment(
          experimentData: { name: $name, description: $description }
        ) {
          experiment {
            id
            name
            description
            dynamicVars
            createdAt
            updatedAt
          }
        }
      }
    `;
  }

  get updateExperiment() {
    return gql`
      mutation updateExperiment(
        $documentId: String!
        $name: String
        $description: String
      ) {
        updateExperiment(
          updateExperimentData: {
            name: $name
            id: $documentId
            description: $description
          }
        ) {
          experiment {
            id
            name
            description
            dynamicVars
            createdAt
            updatedAt
          }
        }
      }
    `;
  }

  get promptListByPagination() {
    return gql`
      query promptListByPagination(
        $experimentId: String!
        $limit: Int!
        $page: Int!
      ) {
        promptListByPagination(
          experimentId: $experimentId
          limit: $limit
          page: $page
        ) {
          totalCount
          prompts {
            id
            name
            description
            conversation {
              role
              content
            }
            latestEvaluationReport {
              id
              model
              eval
              accuracy
              status
              initiatedAt
              completedAt
              createdAt
              updatedAt
            }
            createdAt
            updatedAt
            experimentId
          }
        }
      }
    `;
  }

  get createPromptTemplate() {
    return gql`
      mutation createPromptTemplate(
        $name: String!
        $description: String
        $experimentId: ID!
        $conversation: [InputConversationType]
      ) {
        createPromptTemplate(
          promptTemplateData: {
            name: $name
            description: $description
            experimentId: $experimentId
            conversation: $conversation
          }
        ) {
          promptTemplate {
            id
            name
            description
            conversation {
              role
              content
            }
            createdAt
            updatedAt
          }
        }
      }
    `;
  }

  get createTestCases() {
    return gql`
      mutation createTestCases(
        $experimentId: ID!
        $name: String!
        $description: String
        $dynamicVarValues: JSONString
        $expectedResult: [String]
      ) {
        createTestCases(
          testCaseData: {
            experimentId: $experimentId
            description: $description
            name: $name
            dynamicVarValues: $dynamicVarValues
            expectedResult: $expectedResult
          }
        ) {
          testCase {
            id
            name
            description
            expectedResult
            dynamicVarValues
            createdAt
            updatedAt
            experimentId
          }
        }
      }
    `;
  }

  get getTestCaseById() {
    return gql`
      query getTestCaseById($experimentId: String!) {
        testCases(experimentId: $experimentId) {
          id
          name
          description
          dynamicVarValues
          experimentId
          expectedResult
          updatedAt
          createdAt
        }
      }
    `;
  }
  get getReportByReportId() {
    return gql`
      query getReport($reportId: String!, $limit: Int!, $page: Int!) {
        getReport(reportId: $reportId, limit: $limit, page: $page) {
          id
          model
          eval
          accuracy
          promptTemplateId
          runId
          status
          initiatedAt
          completedAt
          createdAt
          updatedAt
          testCaseEvaluationReport {
            id
            evaluationResultId
            prompt
            testCaseId
            testCaseName
            testCaseDescription
            actualResult
            acceptableResult
            accuracy
          }
        }
      }
    `;
  }

  get updatePromptTemplate() {
    return gql`
      mutation updatePromptTemplate(
        $name: String!
        $description: String
        $id: ID!
        $conversation: [InputConversationType]
      ) {
        updatePromptTemplate(
          updatePromptTemplateData: {
            id: $id
            conversation: $conversation
            name: $name
            description: $description
          }
        ) {
          promptTemplate {
            id
            name
            description
            conversation {
              role
              content
            }
            experimentId
            createdAt
            updatedAt
          }
        }
      }
    `;
  }
}

module.exports = new Queries();
