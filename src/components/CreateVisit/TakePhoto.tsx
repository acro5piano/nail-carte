import * as React from 'react'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import CircularProgress from '@material-ui/core/CircularProgress'
import VisitPhoto from 'sarte/entities/VisitPhoto'

interface Props {
  onChange: (event: any) => Promise<void>
  visitPhotos: VisitPhoto[]
}

interface State {
  loading: boolean
}

class TakePhoto extends React.Component<Props, State> {
  state = {
    loading: false,
  }

  onAddPhoto = async (event: any) => {
    this.setState({ loading: true })
    await this.props.onChange(event)
    this.setState({ loading: false })
  }

  render() {
    const { visitPhotos } = this.props
    const { loading } = this.state

    return (
      <div>
        <div onChange={this.onAddPhoto}>
          <div>写真</div>
          <input type="file" accept="image/*" multiple />
        </div>
        {loading ? (
          <CircularProgress />
        ) : (
          <div>
            <GridList cellHeight={120} cols={2}>
              {visitPhotos.map((photo: VisitPhoto) => (
                <GridListTile key={photo.url} cols={1}>
                  <img src={photo.url} alt="uploading image" />
                </GridListTile>
              ))}
            </GridList>
          </div>
        )}
      </div>
    )
  }
}

export default TakePhoto
