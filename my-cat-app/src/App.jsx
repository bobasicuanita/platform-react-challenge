import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Home from './pages/Home';
import Breeds from './pages/Breeds';
import Favorites from './pages/Favorites';
import { ErrorProvider, useErrorContext } from "./context/ErrorContext";
import { FavoriteProvider } from "./context/FavoriteContext";
import ErrorTooltip from './components/ErrorTooltip';
import Header from './components/Header';
import NotFound from './pages/NotFound';

const queryClient = new QueryClient();

function ErrorWrapper() {
  const { errorMessage, isErrorOpen } = useErrorContext();

  return (
    <ErrorTooltip 
      message={errorMessage} 
      isOpen={isErrorOpen} 
    />
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorProvider>
        <FavoriteProvider>
          <BrowserRouter>
            <Header />
            <ErrorWrapper />
            <div className="p-8 bg-gray-100">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/breeds" element={<Breeds />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/breeds/:breedId" element={<Breeds />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </BrowserRouter>
        </FavoriteProvider>
      </ErrorProvider>
    </QueryClientProvider>
  );
};

export default App;
