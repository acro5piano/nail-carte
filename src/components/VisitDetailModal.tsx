import * as React from 'react'
import Grid from '@material-ui/core/Grid'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import Visit from 'sarte/entities/Visit'
import FlatCard from 'sarte/components/utils/FlatCard'
import FlatTitle from 'sarte/components/utils/FlatTitle'

interface Props {
  visit: Visit | null
}

const VisitComponent = ({ visit }: Props) => {
  if (!visit) {
    return null
  }

  return (
    <div>
      <FlatTitle>来店情報</FlatTitle>
      <FlatCard>
        <div>{visit.localeStringPrice}円</div>
        <div>{visit.note}</div>
      </FlatCard>
      <FlatTitle>使用したもの</FlatTitle>
      <FlatCard>
        <Grid container>
          <Grid item xs={2}>
            ベース
          </Grid>
          <Grid item>{visit.base}</Grid>
        </Grid>
        <Grid container>
          <Grid item xs={2}>
            トップ
          </Grid>
          <Grid item>{visit.color}</Grid>
        </Grid>
        <Grid container>
          <Grid item xs={2}>
            カラー
          </Grid>
          <Grid item>{visit.top}</Grid>
        </Grid>
      </FlatCard>
      <FlatTitle>写真</FlatTitle>
      <GridList cellHeight={120} cols={3}>
        {visit.visitPhotos.map(photo => (
          <GridListTile key={photo.url} cols={1}>
            <img src={photo.url} alt="uploading image" />
          </GridListTile>
        ))}
      </GridList>
    </div>
  )
}

export default VisitComponent
