import * as React from 'react'
import TextField from '@material-ui/core/TextField'
import { VisitForm } from 'sarte/forms/VisitForm'

interface Props {
  visitForm: VisitForm
  onChange: (visitForm: VisitForm) => void
}

class Price extends React.Component<Props> {
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
          name="price"
          type="number"
          label="金額"
          fullWidth
          defaultValue={visitForm.price}
          onChange={this.onChange('price')}
        />
      </div>
    )
  }
}

export default Price
