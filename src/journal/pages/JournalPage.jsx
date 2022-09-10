import { AddOutlined } from "@mui/icons-material"
import { IconButton } from "@mui/material"
import { JounalLayout } from "../layout/JounalLayout"
import { NoteView } from "../views"
import { NothingSelectedView } from "../views/NothingSelectedView"

export const JournalPage = () => {
  return (
    <JounalLayout>
      {/* <Typography >Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis error repellendus accusantium aliquid doloremque. Et at dolor unde, voluptatum dignissimos in numquam alias voluptatem error quos maiores nostrum totam excepturi?</Typography> */}

      <NothingSelectedView />
      {/* <NoteView /> */}

    <IconButton
      size='large'
      sx={{ 
        color: 'white',
        backgroundColor: 'error.main',
        ':hover': { backgroundColor: 'error.main', opacity: 0.9},
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
