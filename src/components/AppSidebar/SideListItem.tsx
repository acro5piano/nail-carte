import * as React from 'react'
import List from 'material-ui/List'
import { withStyles } from 'material-ui/styles'

interface SideListItemBaseInterface {
  title: string
  path: string
  onSelect: () => void
}

const SideListItemBase = ({ classes, title, path, onSelect }) => (
  <List>
    <a href={path} onClick={onSelect} className={classes.link}>
      <div className={classes.item}>
        {title}
      </div>
    </a>
  </List>
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