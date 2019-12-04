import { setTranslations, setLocale, addLocale } from "react-i18nify";
import en from "./translations/en-US";
import ro from "./translations/ro-RO";

import localeRo from 'date-fns/locale/ro';


export default function initializeI18n() {
  addLocale(localeRo);

  setTranslations({ en, ro });
  setLocale("ro");
}
