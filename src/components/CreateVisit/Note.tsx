import * as React from 'react'
import TextField from '@material-ui/core/TextField'
import { VisitForm } from 'sarte/forms/VisitForm'

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
        <TextField
          name="note"
          label="メモ"
          multiline
          fullWidth
          defaultValue={visitForm.note}
          onChange={this.onChange('note')}
        />
      </div>
    )
  }
}

export default Note
