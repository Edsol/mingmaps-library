import * as it_lang from '../i18n/it.js';
import * as en_lang from '../i18n/en.js';

class Translator {
  _lang;
  _string_lang;

  constructor() {
  }

  loadLanguage() {
    this._lang = this.getLanguage();
    var const_name = `${this._lang}_lang`;
    this._string_lang = eval(const_name).default;
  }

  /** 
* Get the language of browser
* @return {String} A String that represent the language of browser of user
*/
  getLanguage() {
    var lang = navigator.languages ? navigator.languages[0] : navigator.language;
    return lang;
  }
}

export { Translator };