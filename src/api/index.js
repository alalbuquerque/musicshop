import pagarme from 'pagarme';
import { payables as mock } from '../Api'

import recipients from './recipients'
import splitRules from './splitRules'
import captureTransaction from './captureTransaction'
import transaction from './transaction'

const API_KEY = process.env.REACT_APP_API_KEY

export default (token, amount) =>
  pagarme.client.connect({api_key: API_KEY})
    .then(recipients(mock))
    .then(splitRules)
    .then(captureTransaction(token.token, amount))
    .then(transaction)
