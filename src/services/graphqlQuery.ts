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
          url
        }
      }
    }
  }
`
