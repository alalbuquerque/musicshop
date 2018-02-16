export const currencify = (value) =>
  value.toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL'
  }).replace('R$', 'R$ ')
