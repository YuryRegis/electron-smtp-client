import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";

import { Footer, Header, Login } from "./components";

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <header className="App-header">
          <Header />
          <Login />
          <Footer />
        </header>
      </div>
    </ChakraProvider>
  );
}

export default App;
