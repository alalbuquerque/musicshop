import { recipient as MockRecipient } from '../mock'

export default (payables) => (client) =>
  Promise.all(
    payables.map(recipient =>
      client.bankAccounts.create(recipient)
        .then(createRecipient(client))
    )
  ).then(recipients => ({recipients, client, payables}))

const createRecipient = (client) => (account) =>
  client.recipients.create({...MockRecipient, bank_account_id: account.id})
    .then(recipient => recipient)
