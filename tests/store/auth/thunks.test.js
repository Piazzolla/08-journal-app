import { loginWithEmailPassword, logoutFirebase, signInWithGoogle } from '../../../src/firebase/providers'
import { checkingCredentials, login, logout } from '../../../src/store/auth/authSlice';
import { checkingAuthentication, startGoogleSignIn, startLoginWithEmailPassword, startLogout } from '../../../src/store/auth/thunks'
import { clearNotesLogout } from '../../../src/store/journal/journalSlice';
import { demoUser } from '../../fixtures/authFixtures';

jest.mock('../../../src/firebase/providers'); //es un mock de todas las exportaciones de providers
const dispatch = jest.fn();

beforeEach( () => jest.clearAllMocks());

describe('Pruebas sobre thunks the auth', () => { 

    test('Debe invocar el checkingCredentials', async() => { 
        //       const valor = checkingCredentials();
        // console.log(valor);
        await checkingAuthentication()( dispatch ) /* el primer () es el llamado de la funcion, 
        el segundo es el valor de retorno de la funcion
        O sea, con el primero llamo a checkingAuthentication y con el segundo llamo
        a la funcion asincrona que esta definida dentro de checkingAuthentication
        que recibe el dispatch como parametro y lo ejecuta
        */
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
    });

    test('startGoogleSignIn debe llamar checkingCredential y login - Exito', async() => { 
        const loginData = { ok: true, ...demoUser };
        await signInWithGoogle.mockResolvedValue( loginData );

        //thunk
        await startGoogleSignIn()( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() )
        expect( dispatch ).toHaveBeenCalledWith( login( loginData) );
     });

     test('startGoogleSignIn debe llamar checkingCredential y logout - Error', async() => { 
        const loginData = { ok: false, errorMessage: 'Un error en Google' };
        await signInWithGoogle.mockResolvedValue( loginData );

        //thunk
        await startGoogleSignIn()( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() )
        expect( dispatch ).toHaveBeenCalledWith( logout( loginData.errorMessage ) );
     });


     test('startLoginWithEmailPassword debe llamar checkingCredential y login - Exito', async() => { 
        const loginData = { ok: true, ...demoUser  };
        const formData = { email: demoUser.email, password: '123456'}

        await loginWithEmailPassword.mockResolvedValue( loginData );

        await startLoginWithEmailPassword( formData )( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() )
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) );
     });

     test('startLogout debe llamar a  logoutFirebase, clearNotes y logout', async() => { 
        await startLogout()( dispatch );
        expect( logoutFirebase ).toHaveBeenCalled(  );
        expect( dispatch ).toHaveBeenCalledWith( logout() );
        expect( dispatch ).toHaveBeenCalledWith( clearNotesLogout() );

      })
 })