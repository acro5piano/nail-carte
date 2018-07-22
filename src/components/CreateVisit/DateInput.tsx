import * as React from 'react'
import TextField from '@material-ui/core/TextField'
import { VisitForm } from 'sarte/forms/VisitForm'

interface Props {
  visitForm: VisitForm
  onChange: (visitForm: VisitForm) => void
}

class DateInput extends React.Component<Props> {
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
        <div>
          <TextField
            name="startAt"
            type="datetime-local"
            label="来店時間"
            defaultValue={visitForm.startAtForHuman}
            onChange={this.onChange('startAt')}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div>
          <TextField
            name="endAt"
            type="datetime-local"
            label="終了時間"
            defaultValue={visitForm.endAtForHuman}
            onChange={this.onChange('endAt')}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
      </div>
    )
  }
}

export default DateInput
