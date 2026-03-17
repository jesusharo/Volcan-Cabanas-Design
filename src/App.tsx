import React from 'react';
import { Switch, Route } from 'wouter';
import { LanguageProvider } from './lib/LanguageContext';
import IndexPage from './pages/index'; // La página principal, antes home.tsx
import LoginPage from './pages/login';
import InventionemPage from './pages/Inventionem';
import FrescosPage from './pages/Frescos';

export default function App() {
  return (
    <LanguageProvider>
      <Switch>
        <Route path="/" component={IndexPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/inventionem" component={InventionemPage} />
        <Route path="/organicos" component={FrescosPage} />
        
        {/* Ruta para la página no encontrada (404) */}
        <Route>
          <div className="min-h-screen flex items-center justify-center bg-[#111111] text-white">
            <h1 className="text-4xl font-serif">404: Página No Encontrada</h1>
          </div>
        </Route>
      </Switch>
    </LanguageProvider>
  );
}