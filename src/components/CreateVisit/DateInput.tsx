import * as React from 'react'
import { VisitForm } from 'sarte/forms/VisitForm'
import BlockInput from 'sarte/components/Presentational/BlockInput'

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
        <BlockInput
          name="startAt"
          type="date"
          label="来店日"
          fullWidth
          defaultValue={visitForm.visitOn}
          onChange={this.onChange('visitOn')}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <BlockInput
          fullWidth
          name="startAt"
          type="time"
          label="来店時間"
          defaultValue={visitForm.startAt}
          onChange={this.onChange('startAt')}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <BlockInput
          fullWidth
          name="endAt"
          type="time"
          label="終了時間"
          defaultValue={visitForm.endAt}
          onChange={this.onChange('endAt')}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
    )
  }
}

export default DateInput
