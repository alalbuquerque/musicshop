import { recipient as api } from '../Api'

export default (payables) => (client) =>
  Promise.all(
    payables.map(recipient =>
      client.bankAccounts.create(recipient)
        .then(recipientItem(client))
    )
  ).then(recipients => ({recipients, client, payables}))

const recipientItem = (client) => (account) =>
  client.recipients.create({...api, bank_account_id: account.id})
    .then(recipient => recipient)
