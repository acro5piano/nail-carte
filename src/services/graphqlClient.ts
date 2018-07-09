import 'whatwg-fetch'

// export const baseUrl = 'https://api.fastestnews.org'
export const baseUrl = 'http://localhost:3000'

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  // 'Authorization': 'Bearer ' + String(storage.get(KEYS.AUTH_TOKEN)),
}

export const gql = async (params: any) => {
  const body = JSON.stringify({
    query: params,
  })

  const response = await fetch(`${baseUrl}/graphql`, {
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
