import React from "react";
import ReactDOM from "react-dom";
import { I18n } from "react-i18nify";

import App from "./App";
import * as serviceWorker from "./serviceWorker";

import initializeI18n from "./utils/i18n/initalize-i18n";


initializeI18n();

// wrap app in I18n so that it renders all all helpers(t, l);
ReactDOM.render(<I18n render={() => <App />} />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister(); TODO
