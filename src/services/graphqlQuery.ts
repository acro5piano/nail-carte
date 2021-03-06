import apolloGql from 'graphql-tag'

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
      birthday
      avatarUrl
      visits {
        id
        price
        note
        startAt
        endAt
        baseBrand
        colorBrand
        topBrand
        baseSku
        colorSku
        topSku
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

export const updateVisit = gql`
  mutation updateVisit($id: String!, $visit: VisitInput!) {
    updateVisit(id: $id, visit: $visit) {
      id
    }
  }
`

export const deleteVisit = gql`
  mutation deleteVisit($id: String!) {
    deleteVisit(id: $id) {
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

export const registerTeam = gql`
  mutation registerTeam($name: String!) {
    registerTeam(name: $name) {
      id
      name
    }
  }
`

export const getMenus = apolloGql`
  query getMenus {
    menus {
      id
      name
    }
  }
`

export const createMenu = apolloGql`
  mutation createMenu($name: String!) {
    createMenu(name: $name) {
      id
      name
    }
  }
`

export const getBrands = apolloGql`
  query getBrands {
    brands {
      name
    }
  }
`
