import React, { useEffect } from "react";
import {
  Box,
  Flex,
  Input,
  FormControl,
  FormLabel,
  Button,
  FormHelperText,
  useToast,
  useTheme,
} from "@chakra-ui/react";

import { UserContext, defaultState } from "../../store";
import ResetAllListeners from "../../utils/resetListenners";

const { ipcRenderer } = window.require("electron");

function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { userState, setUserState } = React.useContext(UserContext);
  const { sizes, space } = useTheme();
  const toast = useToast();

  function buttonHandler() {
    if (email === "" || password === "") {
      return toast({
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
        title: "Opa! Algo de errado não está certo.",
        description: "Preencha todos os campos corretamente para continuar.",
      });
    }
    setUserState({ isAuthorized: false, email: email });

    ipcRenderer.send("login-smtp", {
      email: email,
      password: password,
    });
  }

  useEffect(() => {
    ResetAllListeners();
    ipcRenderer.on("success-toast", (event, { title, message }) => {
      toast({
        title: title,
        duration: 3000,
        isClosable: true,
        status: "success",
        description: message,
        position: "bottom-left",
      });
      return setUserState({
        ...userState,
        isAuthorized: true,
      });
    });

    ipcRenderer.on("error-toast", (event, { title, message }) => {
      toast({
        title: title,
        duration: 3000,
        isClosable: true,
        status: "warning",
        description: message,
        position: "bottom-left",
      });
      return;
    });
  }, [userState]);

  return (
    <Flex
      w="50%"
      flex={1}
      my={space[4]}
      flexDirection="column"
      justifyContent="center"
    >
      <FormControl id="email">
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormHelperText>
          Nós nunca iremos compartilhar seus dados.
        </FormHelperText>
      </FormControl>

      <FormControl id="pswd">
        <FormLabel>Senha</FormLabel>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormControl>

      <Box mt={space[8]}>
        <Button minW={sizes[36]} colorScheme="teal" onClick={buttonHandler}>
          Entrar
        </Button>
      </Box>
    </Flex>
  );
}

export default Login;
