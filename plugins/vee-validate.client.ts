import { localize, setLocale } from '@vee-validate/i18n';
import en from '@vee-validate/i18n/dist/locale/en.json';
import ja from '@vee-validate/i18n/dist/locale/ja.json';
import AllRules from '@vee-validate/rules';
import { defineRule, configure, Form, Field, ErrorMessage } from 'vee-validate';
import { defineNuxtPlugin } from '#app';
export default defineNuxtPlugin((_nuxtApp) => {
  _nuxtApp.vueApp.component('ValidationForm', Form);
  _nuxtApp.vueApp.component('ValidationField', Field);
  _nuxtApp.vueApp.component('ValidationErrorMessage', ErrorMessage);
  configure({
    generateMessage: localize({
      ja,
      en,
    }),
  });
  Object.keys(AllRules).forEach((rule) => {
    defineRule(rule, AllRules[rule]);
  });
  setLocale('ja');
});

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    ValidationForm: typeof Form;
    ValidationField: typeof Field;
    ValidationErrorMessage: typeof ErrorMessage;
  }
}
