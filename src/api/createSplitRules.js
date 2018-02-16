export default ({recipients, client, payables}) =>
  Promise.all(
    recipients.map(recipient =>
      client.bankAccounts.find({id: recipient.bank_account.id})
        .then(matchBankAccount(payables))
        .then(account => ({
          liable: true,
          charge_processing_fee: true,
          recipient_id: recipient.id,
          percentage: account.percentage
        }))
        .then(console.log(recipient))
    )
  ).then(splits => ({client, splits}))

const matchBankAccount = (payables) => (account) =>
  payables.find(person => person.conta === account.conta)
