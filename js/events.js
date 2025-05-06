import { handleInput, handleSubmit, switchCurrencies } from './convert.js';
import { fetchCodes } from './index.js';
import variables from './variables.js';

const { amountInput, form, switchButton } = variables;

fetchCodes();

amountInput.addEventListener('input', handleInput);
form.addEventListener('submit', handleSubmit);
switchButton.addEventListener('click', switchCurrencies);
