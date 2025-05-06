import { handleInput, handleSubmit, switchCurrencies } from './convert.js';
import { fetchCodes, handleTabClick } from './index.js';
import variables from './variables.js';

const { amountInput, form, switchButton, tabs } = variables;

fetchCodes();

amountInput.addEventListener('input', handleInput);
form.addEventListener('submit', handleSubmit);
switchButton.addEventListener('click', switchCurrencies);
tabs.forEach((tab) => tab.addEventListener('click', handleTabClick));
