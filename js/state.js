export default {
  url: 'https://v6.exchangerate-api.com/v6/{API_KEY}',
  codes: [],
  pair: {
    from: '',
    to: '',
  },
  amount: '',
  loading: false,
  currentTab: 'convert',
  currency: {
    code: 'USD',
  },
  currencies: ['USD', 'EUR', 'BYN'],
  actions: {
    remove: 'remove',
    change: 'change',
  },
};
