import * as React from 'react'
import styled from 'styled-components'
import List from '@material-ui/core/List'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'

const Container = styled(List as React.SFC)`
  && {
    width: 250px;
    line-height: 46px;
  }
`
interface SideListItemBaseInterface {
  title: string
  path: string
}

const SideListItemBase = ({ classes, title, path }) => (
  <Container>
    <Link to={path} className={classes.link}>
      <div className={classes.item}>{title}</div>
    </Link>
  </Container>
)

const itemStyles = theme => ({
  link: {
    color: '#333',
    textDecoration: 'none',
  },
  item: {
    paddingLeft: 16,
  },
})

export default withStyles(itemStyles)<SideListItemBaseInterface>(SideListItemBase)
