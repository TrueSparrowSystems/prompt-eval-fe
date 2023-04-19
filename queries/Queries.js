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
        createExperiment(name: $name, description: $description) {
          experiment {
            id
            name
            description
            createdAt
            updatedAt
            dynamicVars
          }
        }
      }
    `;
  }
}

module.exports = new Queries();
