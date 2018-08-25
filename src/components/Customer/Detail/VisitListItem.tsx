import * as React from 'react'
import Grid from '@material-ui/core/Grid'
import Visit from 'sarte/entities/Visit'
import Avatar from '@material-ui/core/Avatar'
import ImageIcon from '@material-ui/icons/Image'
import styled from 'styled-components'

interface VisitProps {
  visit: Visit
  onClick: (visit: Visit) => void
}

const Container = styled.div`
  padding: 12px;
  border-bottom: solid 1px #eee;
`

const StyledPhoto = styled.img`
  border-radius: 3px;
  width: 100%;
`

const VisitListItem = ({ visit, onClick }: VisitProps) => {
  const _onClick = () => onClick(visit)

  return (
    <Container onClick={_onClick}>
      <Grid container spacing={16}>
        <Grid item xs={4}>
          {visit.visitPhotos.length === 0 ? (
            <Avatar>
              <ImageIcon />
            </Avatar>
          ) : (
            <StyledPhoto src={visit.visitPhotos[0].url} />
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
}

export default VisitListItem
