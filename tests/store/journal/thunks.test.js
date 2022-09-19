import { collection, deleteDoc, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../../../src/firebase/config";
import { addNewEmptyNote, savingNewNote, setActiveNote } from "../../../src/store/journal/journalSlice";
import { startNewNote } from "../../../src/store/journal/thunks";

describe('Pruebas en journarl/thunks.js', () => {

    const dispatch = jest.fn();
    const getState = jest.fn();

    beforeEach(() => jest.clearAllMocks());

    test('startNewNotes debe crear una nueva nota en blanco', async () => {
        const uid = 'TEST-UID';
        getState.mockReturnValue({ auth: { uid: uid } });
        await startNewNote()(dispatch, getState);

        expect(dispatch).toHaveBeenCalledWith(savingNewNote());
        expect(dispatch).toHaveBeenCalledWith(addNewEmptyNote({
            title: '',
            body: '',
            id: expect.any(String),
            date: expect.any(Number)
        }));

        expect(dispatch).toHaveBeenCalledWith(setActiveNote({
            title: '',
            body: '',
            id: expect.any(String),
            date: expect.any(Number)
        }));



        // Borrar de firebase ( estos tests se hacen en una base de desarrollo, no de produccion )
        const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);
        const docs = await getDocs( collectionRef );

        const deletePromises = [];
        docs.forEach( doc => deletePromises.push( deleteDoc( doc.ref) ));
        await Promise.all( deletePromises );

    }, 50000);

});