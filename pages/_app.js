import { Provider } from "react-redux";
import store from "../store/store";
import "../styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";
import { ExpContextProvider } from "../context/ExpContext";
import { CompSelectorProvider } from "../context/compSelectorContext";
import { ToastProvider } from "../context/ToastContext";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <CompSelectorProvider>
            <ExpContextProvider>
              <ToastProvider>
                <Component {...pageProps} />
              </ToastProvider>
            </ExpContextProvider>
          </CompSelectorProvider>
        </Provider>
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default MyApp;
