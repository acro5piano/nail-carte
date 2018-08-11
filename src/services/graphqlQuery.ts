const gql = (literals: TemplateStringsArray): string => literals[0]

export const getCustomers = gql`
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

export const createCustomer = gql`
  mutation createCustomer($customer: CustomerInput!) {
    createCustomer(customer: $customer) {
      id
    }
  }
`

export const updateCustomer = gql`
  mutation updateCustomer($id: String!, $customer: CustomerInput!) {
    updateCustomer(id: $id, customer: $customer) {
      id
    }
  }
`

export const createVisit = gql`
  mutation createVisit($visit: VisitInput!) {
    createVisit(visit: $visit) {
      id
    }
  }
`

export const createVisitPhoto = gql`
  mutation createVisitPhoto($visitPhoto: VisitPhotoInput!) {
    createVisitPhoto(visitPhoto: $visitPhoto) {
      id
    }
  }
`

export const getMenus = gql`
  query getMenus() {
    menus {
      id
      name
    }
  }
`
