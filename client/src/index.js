import React from "react";
import ReactDOM from "react-dom";
import { I18n } from "react-i18nify";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import moment from "moment";
import ro from "moment/locale/ro";
import MomentUtils from "@date-io/moment";

import App from "./App";
import initializeI18n from "./utils/i18n/initalize-i18n";
// import * as serviceWorker from "./serviceWorker";


initializeI18n();

// load moment.js locales
moment.locale("ro", ro);


// initialize all libraries that need a HOC
function Wrapper() {
  return (
    <I18n
      render={() => (
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <App />
        </MuiPickersUtilsProvider>
      )}
    />
  );
}

// wrap app in I18n so that it renders all all helpers(t, l);
ReactDOM.render(<Wrapper />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister(); TODO
