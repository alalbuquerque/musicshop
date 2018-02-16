export default (transactionToken, amount) => ({client, splits}) =>
  client.transactions.capture({
    amount,
    id: transactionToken,
    split_rules: splits
  }).then(transaction => ({client, transaction}))
