# Prompt Evaluator Frontend

## Introduction

The Prompt Evaluator is a test suite that helps evaluate prompt templates and AI models. It enables Product Managers and Developers to create prompt templates with custom variables, define test cases with specific variable values and expected responses, and match the generated responses exactly or fuzzily. The suite also allows for comparing GraphQL query responses and measuring the accuracy of prompt templates against different AI models. By leveraging the capabilities of the Prompt Evaluator, Product Managers and Developers can make informed decisions, iterate on their prompt designs, and enhance the overall quality and accuracy of their AI-powered applications.

## Features

- **Experiments** - The experiment feature in our product allows users to create collections of prompt templates. Users can define their own conversations with various roles and prompts, incorporating variables where necessary. Users can evaluate the performance of prompts by executing them with different OpenAI models and associated test cases. 

- **Prompt Templates** - Prompt templates are the building blocks of an Experiment which allow users to define their own prompts. They are highly customizable, allowing users the flexibility to modify the content, format, and variables according to their requirements. 

- **Test Cases** - These are the cases on which the accuracy of a prompt is evaluated. Users can define their own test cases and associate them with prompts. Test cases can be defined as a list of inputs and expected outputs. 

By running prompt templates with different models and test cases, users gain valuable insights into the performance and suitability of their prompts for different scenarios. For detailed information on the features, please refer to the [**product guide**](https://github.com/TrueSparrowSystems/prompt-eval-be/blob/master/docs/productGuide.md).

## Architecture

Prompt Evaluator has two components:

- [**Frontend**](https://github.com/TrueSparrowSystems/prompt-eval-fe)
- [**Backend**](https://github.com/TrueSparrowSystems/prompt-eval-be)

This is the frontend component of the Prompt Evaluator tool. It is built using Next.js. The backend is built using Django and MongoDB. The frontend and backend communicate with each other using the GraphQL API. It is a standalone application that can be deployed separately.

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
## Deploy  Frontend to Cloudflare Pages

## We are using Cloudflare pages to deploy the Prompt Eval frontend application.

### Pre-requisites:-

- Cloudflare Account
- List of Environment variables to be configured

### Steps:-

1. Create a fork of our github **[`prompt-eval-fe`](https://github.com/TrueSparrowSystems/prompt-eval-fe/tree/documentation) repository into your Github Organization.** 
2. Ensure that you have a Cloudflare account and a DNS Record present.

 Kindly follow [this](https://developers.cloudflare.com/pages/get-started/guide/) article to setup the Frontend. 

**Note: You would need to add the following environment vars**:-

 `NEXT_PUBLIC_API_BASE_URL` should be set to `https://<backend-url-endpoint>/graphql`

 `NODE_VERSION` should be set to `18.16.0` . This can be changed based on your version. 

That’s it! You will be able to access the webpage using the url provided by Clouflare Pages.

## Contribution

We welcome more helping hands to make Prompt Evaluator better. Feel free to report issues, raise PRs for fixes & enhancements. We are constantly working towards addressing broader, more generic issues to provide a clear and user-centric solution that unleashes your full potential. Stay tuned for exciting updates as we continue to enhance our tool.

<p align="left">Built with :heart: by <a href="https://truesparrow.com/" target="_blank">True Sparrow</a></p>
