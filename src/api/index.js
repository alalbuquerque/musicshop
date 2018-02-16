import pagarme from 'pagarme'
import { payables as MockPayables } from '../mock'

import createRecipients from './createRecipients'
import createSplitRules from './createSplitRules'
import captureTransaction from './captureTransaction'
import getTransactionDetails from './getTransactionDetails'

const API_KEY = process.env.REACT_APP_API_KEY

export default ({token}, amount) =>
  pagarme.client.connect({api_key: API_KEY})
    .then(createRecipients(MockPayables))
    .then(createSplitRules)
    .then(captureTransaction(token, amount))
    .then(getTransactionDetails)
