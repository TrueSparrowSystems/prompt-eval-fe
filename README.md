# Prompt Evaluator Frontend

## Introduction

Prompt Evaluator is an AI assistant tool specifically designed for product managers and developers. With a strong emphasis on versatility, our tool empowers users to effectively solve a wide range of problems tailored to their unique use cases. By enabling prompt template engineering and enhancement, we ensure that prompts are both easily testable and maintainable. Our tool also provides a seamless integration with the OpenAI API, allowing users to quickly generate and evaluate prompts. With a robust and intuitive UI, we ensure that users can easily navigate through the tool and leverage its full potential.

## Features

- **Experiments** - The experiment feature in our product allows users to create collections of prompt templates. Users can define their own conversations with various roles and prompts, incorporating variables where necessary. Users can evaluate the performance of prompts by executing them with different OpenAI models and associated test cases. 

- **Prompt Templates** - Prompt templates are the building blocks of an Experiment which allow users to define their own prompts. They are highly customizable, allowing users the flexibility to modify the content, format, and variables according to their requirements. 

- **Test Cases** - These are the cases on which the accuracy of a prompt is evaluated. Users can define their own test cases and associate them with prompts. Test cases can be defined as a list of inputs and expected outputs. 

By running prompt templates with different models and test cases, users gain valuable insights into the performance and suitability of their prompts for different scenarios. For detailed information on the features, please refer to the [product guide](./docs/productGuide.md).

## Architecture

Prompt Evaluator has two components:

- [**Frontend**](https://github.com/TrueSparrowSystems/prompt-eval-fe)
- [**Backend**](https://github.com/TrueSparrowSystems/prompt-eval-be)

This is the frontend component of the Prompt Evaluator tool. It is built using Next.js. The backend is built using Django and MongoDB. The frontend and backend communicate with each other using REST APIs. The frontend and backend communicate with each other using the GraphQL API. It is a standalone application that can be deployed separately.

## Tech Stack

- **Next.js**
- **React**
- **Apollo Client**
- **GraphQL**

## Installation

Follow the instructions below for installation:

1. Install all the dependencies required for the project by running the following command
```
npm install
```
2. For Environment Setup, you need to create a new `.env` file in your project directory.

```sh { language=sh }
# For Linux/macOS
cp .env.sample .env
# For Windows
copy .env.sample .env
```

3. The value of `NEXT_PUBLIC_API_BASE_URL` should be the base URL of the [Prompt eval API Server](https://github.com/TrueSparrowSystems/prompt-eval-be) in the .env file.

3. Run the project using the following command
```
npm run dev
```

## Contribution

We welcome more helping hands to make Prompt Evaluator better. Feel free to report issues, raise PRs for fixes & enhancements. We are constantly working towards addressing broader, more generic issues to provide a clear and user-centric solution that unleashes your full potential. Stay tuned for exciting updates as we continue to enhance our tool.

<p align="left">Built with :heart: by <a href="https://truesparrow.com/" target="_blank">True Sparrow</a></p>