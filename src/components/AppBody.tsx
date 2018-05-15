import * as React from 'react'
import FloatingActionButton from './material-ui/Button/FloatingActionButton'
import { withStyles } from 'material-ui/styles'
import Divider from 'material-ui/Divider'
import List, { ListItem, ListItemText } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import ImageIcon from '@material-ui/icons/Image'
// import { OpenSidebarUseCase } from '../use-case/ToggleAppSidebarUseCase'
// import { appContextLocator } from '../AppContextLocator'

interface AppBodyProps {}

const notify = () => alert('hello')

const AppBody = ({ classes }) => (
  <div className="appBody">
    <div className={classes.root}>
      <List>
        <ListItem>
          <Avatar><ImageIcon /></Avatar>
          <ListItemText primary="Photos" secondary="Jan 9, 2014" />
        </ListItem>
        <li><Divider inset /></li>
        <ListItem>
          <Avatar><ImageIcon /></Avatar>
          <ListItemText primary="Photos" secondary="Jan 9, 2014" />
        </ListItem>
        <li><Divider inset /></li>
        <ListItem>
          <Avatar><ImageIcon /></Avatar>
          <ListItemText primary="Photos" secondary="Jan 9, 2014" />
        </ListItem>
        <li><Divider inset /></li>
      </List>
    </div>
    <FloatingActionButton onClick={notify} />
  </div>
)

const styles = {
  root: {
    marginTop: 24,
    backgroundColor: '#fff',
    padding: 12,
  },
}

export default withStyles(styles)<AppBodyProps>(AppBody)
