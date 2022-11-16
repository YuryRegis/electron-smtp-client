import * as Yup from "yup";

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Favor entrar com um e-mail válido")
    .required("Campo obrigatório"),
});

const emailFormSchema = Yup.object().shape({
  to: Yup.string()
    .email("Favor entrar com um e-mail válido")
    .required("Campo obrigatório"),
  subject: Yup.string().required("Campo obrigatório"),
  body: Yup.string().required("Campo obrigatório"),
});

export { loginSchema, emailFormSchema };
