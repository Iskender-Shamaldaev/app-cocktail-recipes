import React from 'react';
import { Container, CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import AppToolbar from './components/UI/AppToolbar/AppToolbar';
import Register from './features/users/Register';
import Login from './features/users/Login';
import Cocktails from './features/Cocktails/Cocktails';
import OneCocktail from './features/Cocktails/components/OneCocktail';
import CocktailsForm from './features/Cocktails/components/CocktailsForm';
import MyCocktails from './features/Cocktails/components/MyCocktails';
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
            <Route path="/cocktails/:id" element={<OneCocktail />} />
            <Route path="/cocktails/new" element={<CocktailsForm />} />
            <Route path="/cocktails/secret" element={<MyCocktails />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Container>
      </main>
    </>
  );
}

export default App;
