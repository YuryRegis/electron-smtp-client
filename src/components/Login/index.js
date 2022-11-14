import React from "react";
import {
  Box,
  Flex,
  Input,
  FormControl,
  FormLabel,
  Button,
  FormHelperText,
  useToast,
} from "@chakra-ui/react";

function Login() {
  const toast = useToast();

  function buttonHandler() {
    toast({
      position: "bottom-left",
      title: "Logado com sucesso!",
      description: "Agora você pode enviar emails.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  }

  return (
    <Flex
      my={4}
      w="50%"
      flex={1}
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

      <Box>
        <Button
          mt={8}
          w={36}
          colorScheme="teal"
          type="submit"
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
