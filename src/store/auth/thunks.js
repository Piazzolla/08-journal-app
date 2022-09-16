import { loginWithEmailPassword, logoutFirebase, registerUsrWithEmailPassword, signInWithGoogle } from "../../firebase/providers";
import { clearNotesLogout } from "../journal/journalSlice";
import { checkingCredentials, login, logout } from "./authSlice"

export const checkingAuthentication = (email, password) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());
    }
}


export const startGoogleSignIn = () => {
    return async (dispatch) => {
        dispatch(checkingCredentials());
        const result = await signInWithGoogle();
        if (!result.ok) return dispatch(logout(result.errorMessage));
        console.log(result);
        dispatch(login(result))
    }
}

export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());
        const resp = await registerUsrWithEmailPassword({ email, password, displayName });
        const { ok, uid, photoURL, errorMessage } = resp;
        if (!ok) return dispatch(logout({ errorMessage }))
        dispatch(login({ uid, displayName, email, photoURL }))
    }

}

export const startLoginWithEmailPassword = ({ email, password }) => {
    
    return async ( dispatch ) => {
        dispatch(checkingCredentials());
        const resp = await loginWithEmailPassword({ email, password });
        const { errorMessage } = resp;
        if( !resp.ok ) return dispatch(logout( { errorMessage } ))
        dispatch( login( resp ))
    }
}

export const startLogout = () => {
    return async( dispatch ) => {
        await logoutFirebase();
        dispatch( logout() );
        dispatch( clearNotesLogout());
    }
}

