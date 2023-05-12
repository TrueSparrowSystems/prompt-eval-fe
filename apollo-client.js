import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_API_BASE_URL,
    cache: new InMemoryCache({
        typePolicies: {
            PromptTemplateType: {
              keyFields: ["updatedAt"],
            },
          },
    }),
});

export default client;