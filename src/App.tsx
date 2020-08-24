import { MuiThemeProvider } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import React, { useContext, useState } from "react";
import Guest from "./guest/Guest";
import { MainTheme } from "./utils/MaterialUiTheme";
import ReactDOM = require("react-dom");


function App() {

  return (
    <MuiThemeProvider theme={MainTheme}>
      <CssBaseline />
      <Guest />
    </MuiThemeProvider>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
export default React.memo(App)