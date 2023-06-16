# Deploy  Frontend to Cloudflare Pages

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
