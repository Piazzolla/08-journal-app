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
        setPhotosToActiveNote: ( state, action ) => {
            state.active.imageUrls = [ ...state.active.imageUrls, ...action.payload ];
            state.isSaving = false;
        },
        deleteNoteById: (state, action) => {
            //volar la nota del store y hacer que no aparezca mas en la sidebar
            state.active = null;
            state.notes = state.notes.filter( note => {
                if( note.id !== action.payload ) return note;
            })



         },
        savingNewNote: (state, action) => {
            state.isSaving = true
        },
        clearNotesLogout: (state) => {
            state.isSaving = false;
            state.messageSaved = '';
            state.notes = [];
            state.active = null;
        },
    }
});


// Action creators are generated for each case reducer function
export const {
    addNewEmptyNote,
    clearNotesLogout,
    deleteNoteById,
    savingNewNote,
    setActiveNote,
    setNotes,
    setPhotosToActiveNote,
    setSaving,
    updatedNote,
} = journalSlice.actions;