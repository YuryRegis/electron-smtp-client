import React, { createContext } from "react";

const defaultState = {
  email: "",
  isAuthorized: false,
};

const UserContext = createContext(defaultState);

export { UserContext, defaultState };
