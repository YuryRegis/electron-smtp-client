import "./App.css";
import React from "react";
import { ChakraProvider } from "@chakra-ui/react";

import { Footer, Header } from "./components";
import { Login, MainApplication } from "./pages";
import { UserContext, defaultState } from "./store";

function App() {
  const [userState, setUserState] = React.useState(defaultState);
  const provider = React.useMemo(
    () => ({ userState, setUserState }),
    [userState, setUserState]
  );

  return (
    <ChakraProvider>
      <UserContext.Provider value={provider}>
        <div className="App">
          <header className="App-header">
            <Header />
            {Boolean(userState.isAuthorized) ? <MainApplication /> : <Login />}
            <Footer />
          </header>
        </div>
      </UserContext.Provider>
    </ChakraProvider>
  );
}

export default App;
