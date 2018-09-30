import * as React from 'react'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Grid from '@material-ui/core/Grid'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import Visit from 'sarte/entities/Visit'
import FlatCard from 'sarte/components/utils/FlatCard'
import FlatTitle from 'sarte/components/utils/FlatTitle'
import { ModalHeader, StyledIconButton, Title } from 'sarte/components/Modal'
import Flex from 'sarte/components/utils/Flex'

interface Props {
  visit: Visit | null
}

interface HeaderProps {
  onClose: () => void
  onDelete: () => void
  onEdit: () => void
  title: string
}

// TODO: <Modal コンポーネントはこちらで定義した方が良さそう

export const HeaderComponent = ({ onClose, onDelete, onEdit, title }: HeaderProps) => (
  <ModalHeader>
    <Flex>
      {onClose && (
        <StyledIconButton color="inherit" onClick={onClose}>
          <CloseIcon />
        </StyledIconButton>
      )}
      <Title>{title}</Title>
    </Flex>
    <div>
      <IconButton color="inherit" onClick={onDelete}>
        <DeleteIcon />
      </IconButton>
      <IconButton color="inherit" onClick={onEdit}>
        <EditIcon />
      </IconButton>
    </div>
  </ModalHeader>
)

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
