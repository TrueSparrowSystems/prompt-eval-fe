import { Provider } from "react-redux";
import store from "../store/store";
import "../styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";
function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default MyApp;
