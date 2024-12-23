import React from "react";

import Main from "./src/Main";
import { NativeRouter } from "react-router-native";

const App = () => {
  return (
    <NativeRouter>
      <Main />
    </NativeRouter>
  );
};

export default App;
