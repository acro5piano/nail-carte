import * as React from 'react'
import Button from 'material-ui/Button'
import { PropTypes } from 'material-ui'
import AddIcon from '@material-ui/icons/Add'
import { withStyles } from 'material-ui/styles'

interface FloatingActionButtonProps {
  onClick: () => void
  color?: PropTypes.Color
}

const FloatingActionButton: React.SFC<FloatingActionButtonProps> = ({ onClick, color }) => (
  <Button onClick={onClick} variant="fab" color={color || 'primary'}>
    <AddIcon />
  </Button>
)

FloatingActionButton.defaultProps = {
  color: 'primary',
}

const styles = {
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
}

export default withStyles(styles)(FloatingActionButton)
