import * as React from 'react'
import TextField from '@material-ui/core/TextField'
import { VisitForm } from 'sarte/forms/VisitForm'
import { InputContainer, Caption } from './Presentational'

interface Props {
  visitForm: VisitForm
  onChange: (visitForm: VisitForm) => void
}

class Note extends React.Component<Props> {
  onChange = (field: string) => (event: any) => {
    this.props.onChange(
      new VisitForm({
        ...this.props.visitForm,
        [field]: event.target.value,
      }),
    )
  }

  render() {
    const { visitForm } = this.props

    return (
      <div>
        <Caption>その他の情報を入力しましょう。</Caption>
        <InputContainer>
          <TextField
            name="note"
            label="メモ(自由入力)"
            multiline
            fullWidth
            defaultValue={visitForm.note}
            onChange={this.onChange('note')}
          />
        </InputContainer>
      </div>
    )
  }
}

export default Note
