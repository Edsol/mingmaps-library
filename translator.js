"use strict"

class Translator {
  constructor() {
    console.log('traslator constructor');
  }

  loadLanguage() {
    console.log(json);
    // fetch(`../i18n/${this._lang}.json`)
    //   .then((res) => res.json())
    //   .then((translation) => {
    //     console.log(translation);
    //   })
    //   .catch(
    //     () => {
    //       console.error(`Could not load ${_lang}.json.`);
    //     }
    //   );
  }

  /** 
* Get the language of browser
* @return {String} A String that represent the language of browser of user
*/
  getLanguage() {
    var lang = navigator.languages ? navigator.languages[0] : navigator.language;
    return lang;
  }


} export default Translator;