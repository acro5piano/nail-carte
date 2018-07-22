import * as React from 'react'
import GridList from '@material-ui/core/GridList'
import styled from 'styled-components'
import GridListTile from '@material-ui/core/GridListTile'
import CircularProgress from '@material-ui/core/CircularProgress'
import VisitPhoto from 'sarte/entities/VisitPhoto'
import { InputContainer, Caption } from './Presentational'

const StyledFileInput = styled.input`
  border: solid 1px #ccc;
  padding: 12px;
  width: 100%;
  border-radius: 3px;
  border-style: dashed;
`

const PhotoPreview = styled.div`
  margin-top: 24px;
`

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
        <Caption>写真をアップロードしましょう。</Caption>
        <InputContainer>
          <div onChange={this.onAddPhoto}>
            <StyledFileInput type="file" accept="image/*" multiple />
          </div>
          {loading ? (
            <CircularProgress />
          ) : (
            <PhotoPreview>
              <GridList cellHeight={120} cols={2}>
                {visitPhotos.map((photo: VisitPhoto) => (
                  <GridListTile key={photo.url} cols={1}>
                    <img src={photo.url} alt="uploading image" />
                  </GridListTile>
                ))}
              </GridList>
            </PhotoPreview>
          )}
        </InputContainer>
      </div>
    )
  }
}

export default TakePhoto
