import React, { FC } from "react";
import { Reset } from "styled-reset";

import { Home } from "./components/pages/Home";
const App: FC = () => (
  <>
    <Reset />
    <Home />
  </>
);

export default App;
