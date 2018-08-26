import styled from 'styled-components'
import Paper from '@material-ui/core/Paper'

export const Root = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Head = styled.div`
  margin-top: 40px;
  text-align: center;
`

export const Title = styled.div`
  font-weight: bold;
  font-size: 16px;
`

export const StyledPaper = styled(Paper as React.SFC<any>)`
  margin-top: 30px;
  padding: 18px;
`

export const Main = styled.div`
  width: 480px;
`

export const Submit = styled.div`
  margin-top: 40px;
  text-align: center;
`
