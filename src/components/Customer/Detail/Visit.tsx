import * as React from 'react'
import Grid from '@material-ui/core/Grid'
import Visit from 'sarte/entities/Visit'
import Avatar from '@material-ui/core/Avatar'
import ImageIcon from '@material-ui/icons/Image'
import styled from 'styled-components'

interface VisitProps {
  visit: Visit
}

const StyledPhoto = styled.img`
  border-radius: 3px;
  width: 100%;
`

const Container = styled.div`
  padding: 12px;
  background-color: #fff;
`

const VisitComponent = ({ visit }: VisitProps) => (
  <Container>
    <Grid container spacing={16}>
      <Grid item xs={4}>
        {visit.visitPhotos.length === 0 ? (
          <Avatar>
            <ImageIcon />
          </Avatar>
        ) : (
          visit.visitPhotos.map(photo => <StyledPhoto key={photo.id} src={photo.url} />)
        )}
      </Grid>
      <Grid item xs={8}>
        <div>{visit.localeStringPrice}円</div>
        <div>{visit.note}</div>
        <div>{visit.startAtForHuman}</div>
      </Grid>
    </Grid>
  </Container>
)

export default VisitComponent
