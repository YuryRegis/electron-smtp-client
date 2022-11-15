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
  const { userState, setUserState } = React.useContext(UserContext);
  const { sizes, space } = useTheme();
  const toast = useToast();

  function buttonHandler() {
    setUserState({ ...userState, email: "" });

    ipcRenderer.send("login-smtp", {
      email: "",
      password: "",
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
  }, []);

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
        <Input type="email" />
        <FormHelperText>
          Nós nunca iremos compartilhar seus dados.
        </FormHelperText>
      </FormControl>

      <FormControl id="password">
        <FormLabel>Senha</FormLabel>
        <Input type="password" />
      </FormControl>

      <Box mt={space[8]}>
        <Button
          type="submit"
          minW={sizes[36]}
          colorScheme="teal"
          onClick={buttonHandler}
          onSubmit={buttonHandler}
        >
          Entrar
        </Button>
      </Box>
    </Flex>
  );
}

export default Login;
