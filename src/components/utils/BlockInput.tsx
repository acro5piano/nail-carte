import * as React from 'react'
import TextField from '@material-ui/core/TextField'
import styled from 'styled-components'

const Wrap = styled.div`
  margin-top: 36px;
`

const BlockInput = props => (
  <Wrap>
    <TextField {...props} />
  </Wrap>
)

export default BlockInput
