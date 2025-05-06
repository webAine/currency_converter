import variables from './variables.js';
import state from './state.js';
import { handleChange } from './convert.js';

const { selects, success } = variables;

const renderCodeList = () => {
  selects.forEach((select) => {
    state.codes.forEach(([code]) => {
      const element = document.createElement('option');

      element.value = code;
      element.textContent = code;

      select.insertAdjacentElement('beforeend', element);
    });

    select.addEventListener('change', handleChange);
  });
};

export const fetchCodes = async () => {
  try {
    const res = await fetch(`${state.url}/codes`);
    const data = await res.json();

    if (data.result === success) {
      state.codes = data.supported_codes;

      renderCodeList();
    }

    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
