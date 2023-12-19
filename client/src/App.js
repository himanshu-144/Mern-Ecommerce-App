import './App.css';
import { Routes, Route} from "react-router-dom"
import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Checkout from './pages/Checkout/Checkout';
import Dashboard from './pages/Dashboard/Dashboard';

function App() {
  return (
    
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/checkout' element={<Checkout />} />
        
      </Routes>
    </div>
    
  );
}

export default App;
