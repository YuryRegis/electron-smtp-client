import React, { useEffect } from "react";
import { Textarea, useTheme } from "@chakra-ui/react";

import {
  Box,
  Flex,
  Input,
  FormControl,
  FormLabel,
  Button,
  useToast,
} from "@chakra-ui/react";

import { UserContext, defaultState } from "../../store";
import ResetAllListeners from "../../utils/resetListenners";
const { ipcRenderer } = window.require("electron");

function MainApplication() {
  const [body, setBody] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [subject, setSubject] = React.useState("");
  const { userState, setUserState } = React.useContext(UserContext);
  const { space, sizes, radii } = useTheme();
  const toast = useToast();

  function buttonHandler() {
    if (email === "" || body === "" || subject === "") {
      return toast({
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
        title: "Opa! Algo de errado não está certo.",
        description: "Preencha todos os campos corretamente para continuar.",
      });
    }
    try {
      ipcRenderer.send("send-mail", {
        from: userState?.email,
        to: email,
        subject: subject,
        text: body,
      });
    } catch (error) {
      return toast({
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
        title: "Opa! Algo de errado não está certo.",
        description: error.message,
      });
    }
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
      setBody("");
      setEmail("");
      setSubject("");
    });

    ipcRenderer.on("error-toast", (event, { title, message }) => {
      toast({
        title: title,
        duration: 5000,
        isClosable: true,
        status: "warning",
        description: message,
        position: "bottom-left",
      });
      return;
    });

    ipcRenderer.on("logout", (event, _) => {
      return setUserState(defaultState);
    });
  }, [userState]);

  return (
    <Flex
      my={4}
      w="50%"
      flex={1}
      flexDirection="column"
      justifyContent="center"
    >
      <FormControl id="from">
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <Box mt={space[3]}>
        <FormControl id="subject">
          <FormLabel>Assunto</FormLabel>
          <Input value={subject} onChange={(e) => setSubject(e.target.value)} />
        </FormControl>
      </Box>

      <Box mt={space[3]}>
        <FormControl id="body">
          <FormLabel>Mensagem</FormLabel>
          <Textarea
            size="xs"
            value={body}
            minH={sizes[36]}
            borderRadius={radii.md}
            onChange={(e) => setBody(e.target.value)}
          />
        </FormControl>
      </Box>

      <Box>
        <Box w="full" my={space[8]} display="flex" justifyContent="center">
          <Button
            mx={space[4]}
            w={sizes[36]}
            colorScheme="red"
            onClick={() => setUserState(defaultState)}
          >
            Sair
          </Button>

          <Button
            mx={space[4]}
            w={sizes[36]}
            type="submit"
            colorScheme="teal"
            onClick={buttonHandler}
          >
            Enviar
          </Button>
        </Box>
      </Box>
    </Flex>
  );
}

export default MainApplication;
