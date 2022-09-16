import { useMemo } from "react"
import { useDispatch } from "react-redux";
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { TurnedInNot } from "@mui/icons-material"
import { setActiveNote } from "../../store/journal/journalSlice";

export const SidebarItem = ( { title, body, id, date, imageUrls = [] } ) => {
    
    const newTitle = useMemo ( () => {
        return title.length > 17 ? title.substring(0, 17) + '...' : title;
    }, [ title ]);

    const dispatch = useDispatch();
    const onClickListItem = () => {
        dispatch( setActiveNote({ title, body, id, date, imageUrls }))
    }

    return (
        <ListItem key={id} disablePadding onClick={ onClickListItem }>
            <ListItemButton>
                <ListItemIcon>
                    <TurnedInNot />
                </ListItemIcon>
                <Grid container>
                    <ListItemText primary={ newTitle } />
                    <ListItemText secondary={ body } />
                </Grid>
            </ListItemButton>
        </ListItem>
    )
}
