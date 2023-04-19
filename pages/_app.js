import { Provider } from "react-redux";
import store from "../store/store";
import "../styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";
import { ExpContextProvider } from "../context/ExpContext";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <ExpContextProvider>
        <Component {...pageProps} />
          </ExpContextProvider>
      </Provider>
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default MyApp;
