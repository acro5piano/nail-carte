import styled from 'styled-components'

const FlatOption = styled.div`
  padding: 12px;
  border: solid 1px #ccc;
  border-radius: 3px;
  margin-top: 12px;
  background: ${(props: { selected: boolean }) => (props.selected ? '#ccc' : '#fff')};
`

export default FlatOption
