export default ({client, transaction}) =>
  client.transaction.find({transactionId: transaction.token})
    .then(payables(client))
    .then(payables => ({...payables, transaction}))

const payables = (client) => (payables) =>
  Promise.all(
    payables.map(({recipient_id, amount}) =>
      client.recipients.find({id: recipient_id})
        .then(recipient => ({
          amount,
          ...recipient,
          id: recipient.id,
          name: recipient.bank_account.legal_name
        }))
    )
  ).then(payables => ({payables}))

