import { Link as RouterLink } from 'react-router-dom';
import { Button, Grid, Link, TextField, Typography } from "@mui/material";
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { useState } from 'react';


const formData = {
  email: 'fernando@google.com',
  password: '123456',
  displayName: 'Fernando Herrera'
  
}

const formValidations = {
  email: [ (value) => value.includes('@'), 'El correo debe tener una @' ],
  password: [ (value) => value.length >= 6, 'El password debe de tener mas de 6 letras'],
  displayName: [ (value) => value.length >= 1, 'El nombre es obligatorio'],
}

export const RegisterPage = () => {

  const [formSubmitted, setFormSubmitted] = useState(false)

  const { displayName, email, password, onInputChange, formState,
      isFormValid, displayNameValid, emailValid, passwordValid 
  } = useForm( formData, formValidations );


  const onSubmit = ( event ) => {
    event.preventDefault();
    setFormSubmitted(true);
  }
  return (

    <AuthLayout title="Registro">

      <form onSubmit={ onSubmit }>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField label="Nombre completo"
              type="text"
              placeholder="John Doe"
              fullWidth
              name="displayName"
              value={ displayName }
              onChange={ onInputChange }
              error={ !!displayNameValid && formSubmitted}
              helperText={ displayNameValid }
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField label="Correo"
              type="email"
              placeholder="correo@google.com"
              fullWidth
              name="email"
              value={ email }
              onChange={ onInputChange }
              error={ !!emailValid && formSubmitted}
              helperText={ emailValid }

            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField label="Contraseña"
              type="password"
              placeholder="Contraseña"
              fullWidth
              name="password"
              value={ password }
              onChange={ onInputChange }
              error={ !!passwordValid && formSubmitted}
              helperText={ passwordValid }

            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <Button variant='contained' fullWidth type="submit">
                Crear cuenta
              </Button>
            </Grid>
          </Grid>

          <Grid container directon='row' justifyContent='end'>
          <Typography sx={{ mr: 1}}>Ya tienes cuenta?</Typography>
            <Link component={RouterLink} color='inherit' to="/auth/login">
              Ingresar
            </Link>
          </Grid>

        </Grid>
      </form>
    </AuthLayout>
  )
}
