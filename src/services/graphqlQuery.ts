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
        startAt
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

export const createVisit = `
  mutation createVisit($visit: VisitInput!) {
    createVisit(visit: $visit) {
      id
    }
  }
`

export const createVisitPhoto = `
  mutation createVisitPhoto($visitPhoto: VisitPhotoInput!) {
    createVisitPhoto(visitPhoto: $visitPhoto) {
      id
    }
  }
`
