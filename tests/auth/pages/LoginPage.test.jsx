import { configureStore } from "@reduxjs/toolkit";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { LoginPage } from "../../../src/auth/pages/LoginPage";
import { authSlice, startGoogleSignIn, startLoginWithEmailPassword } from "../../../src/store/auth";
import { notAuthenticatedState } from "../../fixtures/authFixtures";


const mockStartGoogleSignIn = jest.fn();
const mockStartLoginWithEmailPassword = jest.fn();

jest.mock('../../../src/store/auth/thunks', () => ({
    startGoogleSignIn: () => mockStartGoogleSignIn,
    startLoginWithEmailPassword: ({ email, password }) => {
        return () => mockStartLoginWithEmailPassword( { email, password }) 
    },
}));


/*
    Hago todo este bardo de sobreescribir el comportamiento de useDispatch para que no espere
    los dos argumentos que vienen por defecto en el useDispatch
*/
jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: () => (fn) => fn(), /* si pongo (fn) => fn() estoy definiendo una funcion que
    recibe un argumento y lo manda a llamar. Cuando pongo el extra () => antes
    estoy diciendo que retorne la fucion esa */
}));


const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    },
    preloadedState: {
        auth: notAuthenticatedState
    }
})

describe('Pruebas en <LoginPage />', () => {

beforeEach( () => jest.clearAllMocks() );

    test('debe de mostrar el componente correctamente', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        ) 

        //screen.debug();
        expect( screen.getAllByText('Login').length ).toBeGreaterThan( 0 );
    });

    test('boton de google debe de llamar el startGoogleSignIn', () => { 
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>

            
        ) 

        const googleBtn = screen.getByLabelText('google-btn');
        fireEvent.click( googleBtn );
        expect( mockStartGoogleSignIn ).toHaveBeenCalled();

     });

     test('submit debe llamar startLoginWithEmailPassword', () => { 

        const email    = 'fernando@google.com';
        const password = '123456';
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        )

        const emailField = screen.getByRole('textbox', { name: 'Correo'}); /* agarra el input que tiene 
        label Correo aunque no tiene name Correo. Es algo que hace react testing library cuando 
        genera el html a partir del jsx*/
        fireEvent.change( emailField, { target: { name: 'email', value:email }}); 
        
        const passwordField = screen.getByTestId( 'password' ); /* por algun motivo con contrasenia es diferente
        y le tengo que agregar inputProps y agarrarlo con esa prop  */
        fireEvent.change( emailField, { target: { name: 'password', value:password }}); 


        const loginForm = screen.getByLabelText( 'submit-form' );
        fireEvent.submit( loginForm ); 

        expect( mockStartLoginWithEmailPassword).toHaveBeenCalledWith({
            email: email,
            password: password
        });

      });



}); 