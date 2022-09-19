import { authSlice, checkingCredentials, login, logout } from "../../../src/store/auth/authSlice"
import { authtenticatedState, demoUser, initialState } from "../../fixtures/authFixtures";

describe('Pruebas en authSlice.js', () => { 
    test('Debe regresar el estado inicial y llamarse auth', () => { 
        
        const state = authSlice.reducer( initialState, {} )
        expect( authSlice.name ).toBe('auth'); 
        expect( state ).toEqual( initialState );
     });

     test('debe realizar la autenticacion', () => { 
        const state = authSlice.reducer( initialState, login( demoUser ) )
        //console.log(state);
        expect( state ).toEqual({
            status: 'authenticated',
            uid: demoUser.uid,
            email: demoUser.email,
            displayName: demoUser.displayName,
            photoURL: demoUser.photoURL,
            errorMessage: null,
        }  );
      });

      test('debe realizar el logout sin argumentos', () => { 
        const state = authSlice.reducer( authtenticatedState, logout( ) )
        //console.log(state);
        expect( state ).toEqual({
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: undefined,
        } );
      });

      test('debe realizar el logout y mostrar un mensaje de error', () => { 

        const errorMessage = 'Credenciales no son correctas'
        const state = authSlice.reducer( authtenticatedState, logout({ errorMessage }) )
        //console.log(state);
        expect( state ).toEqual({
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: errorMessage,
        } );
      });

      test('debe cambiar el estado a checking', () => { 

        const state = authSlice.reducer( authtenticatedState, checkingCredentials() )
        //console.log(state);
        expect( state.status ).toBe('checking');
      });


 })