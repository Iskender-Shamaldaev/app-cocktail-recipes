import React from 'react';
import { Container, CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import AppToolbar from './components/UI/AppToolbar/AppToolbar';
import Register from './features/users/Register';
import Login from './features/users/Login';
import './App.css';
import Chat from './features/Chat/Chat';

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
            <Route path="/" element={<Chat />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Container>
      </main>
    </>
  );
}

export default App;
