import { AddOutlined } from "@mui/icons-material"
import { IconButton } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { startNewNote } from "../../store/journal/thunks"
import { JounalLayout } from "../layout/JounalLayout"
import { NoteView } from "../views"
import { NothingSelectedView } from "../views/NothingSelectedView"

export const JournalPage = () => {

  const dispatch = useDispatch();
  const { isSaving, active } = useSelector( state => state.journal)

  const onClickNewNote = () => {
    dispatch( startNewNote() );
  }
  return (
    <JounalLayout className="animate__animated animate__fadeIn animate__faster"
    >
      {/* <Typography >Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis error repellendus accusantium aliquid doloremque. Et at dolor unde, voluptatum dignissimos in numquam alias voluptatem error quos maiores nostrum totam excepturi?</Typography> */}

    { !!active?  <NoteView /> : <NothingSelectedView /> }

      <IconButton onClick={ onClickNewNote } disabled={ isSaving }
        size='large'
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
          position: 'fixed',
          right: 50,
          bottom: 50
        }}
      >
        <AddOutlined sx={{ fontSize: 30 }} />
      </IconButton>
    </JounalLayout>
  )
}
