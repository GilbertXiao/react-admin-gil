import React from 'react'; 
import { BrowserRouter,Switch,Route } from 'react-router-dom';
import Login from './pages/Login'
import Admin from './pages/Admin'
import NotFound from './pages/NotFound'

function App() {
  return (
   <BrowserRouter>
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/404" component={NotFound} />
      <Route path="/" component={Admin} />      
    </Switch>
   </BrowserRouter>
  );
}

export default App;
