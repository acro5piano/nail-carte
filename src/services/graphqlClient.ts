import 'whatwg-fetch'
import ApolloClient from 'apollo-boost'
import { API_URL } from 'sarte/config'
import { STORAGE_TOKEN } from 'sarte/stores/AuthStore'

const GQL_URL = `${API_URL}/graphql`

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: 'Bearer ' + String(localStorage.getItem(STORAGE_TOKEN)),
}

export const client = new ApolloClient({
  uri: GQL_URL,
  headers: {
    Authorization: headers.Authorization,
  },
})

export const gql = async (query: string, variables: any = {}) => {
  const body = JSON.stringify({
    query,
    variables,
  })

  const response = await fetch(GQL_URL, {
    method: 'POST',
    body,
    headers,
  })
  if (response.ok) {
    return response.json()
  } else {
    throw Error('Fetch failed.')
  }
}
