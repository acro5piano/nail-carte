export const getCustomers = `
  query getCustomers {
    customers {
      id
      address
      email
      name
      occupation
      phoneNumber
      zip
      visits {
        id
        price
        note
        visitPhotos {
          id
          url
        }
      }
    }
  }
`

export const createCustomer = `
  mutation createCustomer($customer: CustomerInput!) {
    createCustomer(customer: $customer) {
      id
    }
  }
`

export const updateCustomer = `
  mutation updateCustomer($id: String!, $customer: CustomerInput!) {
    updateCustomer(id: $id, customer: $customer) {
      id
    }
  }
`
