import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSaved: '',
        notes: [],
        active: null,
        // active: {
        //     id: 'ABC123',
        //     title: '',
        //     body: '',
        //     date: 1234567,
        //     imageUrls: [],
        // }
    },
    reducers: {
        addNewEmptyNote: (state, action) => {
            state.notes.push( action.payload );
            state.isSaving = false;
         },
        setActiveNote: (state, action) => {
            state.active = action.payload;
            state.messageSaved = '';
         },
        setNotes: (state, action) => {
            state.notes = action.payload
         },
        setSaving: (state, action) => {
            state.isSaving = true;
            state.messageSaved = '';
         },
        updatedNote: (state, action) => { 
            state.isSaving = false;
            state.notes = state.notes.map( note => { 
              return  note.id === action.payload.id? action.payload: note;    
            })

            //TODO: mostrar mensaje de actualizacion
            state.messageSaved = `${ action.payload.title }, actualizada correctamente`;
            /* no dispardo el sweetalert aca porque los reducers no deben correr librerias de terceros */
        },
        deleteNoteById: (state, action) => { },
        savingNewNote: (state, action) => {
            state.isSaving = true
        },
    }
});


// Action creators are generated for each case reducer function
export const {
    addNewEmptyNote,
    setActiveNote,
    setNotes,
    setSaving,
    updatedNote,
    deleteNoteById,
    savingNewNote
} = journalSlice.actions;