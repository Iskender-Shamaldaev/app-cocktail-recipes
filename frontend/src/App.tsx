import React from 'react';
import { Container, CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import AppToolbar from './components/UI/AppToolbar/AppToolbar';
import Register from './features/users/Register';
import Login from './features/users/Login';
import Cocktails from './features/Cocktails/Cocktails';
import Ingredients from './features/ingredients/Ingredients';
import CocktailsForm from './features/Cocktails/components/CocktailsForm';
import './App.css';

function App() {
  return (
    <>
      <CssBaseline />
      <header>
        <AppToolbar />
      </header>

      <main>
        <Container maxWidth="xl">
          <Routes>
            <Route path="/" element={<Cocktails />} />
            <Route path="/cocktails/:id" element={<Ingredients />} />
            <Route path="/cocktails/new" element={<CocktailsForm />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Container>
      </main>
    </>
  );
}

export default App;
