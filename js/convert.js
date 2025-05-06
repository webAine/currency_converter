import { renderResult } from './markups.js';
import state from './state.js';
import { convertTime, formatToCurrency, getFullTitle } from './utils.js';
import variables from './variables.js';

const { success, resultFrom, resultTo, formResults, rateConversion, rateLast, toSelect, fromSelect } = variables;

export const handleChange = ({ target: { value, name } }) => {
  state.pair = {
    ...state.pair,
    [name]: value,
  };
};

export const handleInput = ({ target: { value, name } }) => {
  state[name] = +value;
};

const insertResults = ({
  base_code: baseCode,
  target_code: targetCode,
  conversion_rate: rate,
  conversion_result: result,
  time_last_update_utc: time,
}) => {
  const from = {
    code: baseCode,
    amount: state.amount,
    full: getFullTitle(state.codes, baseCode),
  };

  const to = {
    code: targetCode,
    amount: result,
    full: getFullTitle(state.codes, targetCode),
  };

  resultFrom.innerHTML = renderResult(from);
  resultTo.innerHTML = renderResult(to);

  const baseValue = formatToCurrency(baseCode, 1);
  const targetValue = formatToCurrency(targetCode, rate);

  rateConversion.textContent = `${baseValue} = ${targetValue}`;
  rateLast.textContent = `Last updated ${convertTime(time)}`;

  formResults.classList.add('show');
};

export const handleSubmit = async (e) => {
  e.preventDefault();

  const {
    url,
    amount,
    pair: { from, to },
  } = state;

  state.loading = true;

  if (!amount || !from || !to) return;

  try {
    const res = await fetch(`${url}/pair/${from}/${to}/${amount}`);
    const data = await res.json();

    console.log(data);

    if (data.result === success) insertResults(data);

    state.loading = false;
  } catch (error) {
    console.log(error);
  }
};

export const switchCurrencies = () => {
  const {
    pair: { from, to },
  } = state;

  if (!from || !to) return;

  state.pair = {
    from: to,
    to: from,
  };

  toSelect.value = from;
  fromSelect.value = to;
};
