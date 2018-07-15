import 'whatwg-fetch'
import { API_URL } from 'sarte/config'

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  // 'Authorization': 'Bearer ' + String(storage.get(KEYS.AUTH_TOKEN)),
}

export const gql = async (query: string, variables: any = {}) => {
  const body = JSON.stringify({
    query,
    variables,
  })

  const response = await fetch(`${API_URL}/graphql`, {
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
