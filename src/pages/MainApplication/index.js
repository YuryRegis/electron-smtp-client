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

function MainApplication({ setAuthorized }) {
  const { userState, setUserState } = React.useContext(UserContext);
  const { space, sizes, radii } = useTheme();
  const toast = useToast();

  function buttonHandler() {
    ipcRenderer.send("send-mail", {
      from: userState?.email,
      to: "yury.kun.sherlockiano@gmail.com",
      subject: "Message test 3",
      text: "I hope this message gets delivered!",
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
    });
  }, []);

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
        <Input type="email" />
      </FormControl>

      <Box mt={space[3]}>
        <FormControl id="subject">
          <FormLabel>Assunto</FormLabel>
          <Input />
        </FormControl>
      </Box>

      <Box mt={space[3]}>
        <FormControl id="body">
          <FormLabel>Mensagem</FormLabel>
          <Textarea size="xs" minH={sizes[36]} borderRadius={radii.md} />
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
            // onSubmit={buttonHandler}
          >
            Enviar
          </Button>
        </Box>
      </Box>
    </Flex>
  );
}

export default MainApplication;
