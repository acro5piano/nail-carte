import * as React from 'react'
import Button from '@material-ui/core/Button'
import { PropTypes } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { withStyles } from '@material-ui/core/styles'

interface FloatingActionButtonProps {
  onClick?: () => void
  color?: PropTypes.Color
  Icon?: React.ComponentType<any>
}

const FloatingActionButton: React.SFC<any> = ({ classes, onClick, color, Icon = AddIcon }) => (
  <Button onClick={onClick} variant="fab" color={color} className={classes.button}>
    <Icon />
  </Button>
)

FloatingActionButton.defaultProps = {
  color: 'primary',
}

const styles = theme => ({
  button: {
    // HACK: 'position: absolute' type needs cast to 'absolute'.
    // @see https://github.com/Microsoft/TypeScript/issues/11465
    position: 'fixed' as 'absolute',
    bottom: 16,
    right: 16,
  },
})

export default withStyles(styles)<FloatingActionButtonProps>(FloatingActionButton)
