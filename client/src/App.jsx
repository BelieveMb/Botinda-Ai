// src/App.jsx
import Homepage from './pages/Homepage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login';
import VerifyCode from './pages/VerifyCode';
import Register from './pages/Register';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <BrowserRouter>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
         <div style={{ flex: 1, overflow: 'auto' }}>
            <Routes>
              <Route path="/" element={<Homepage />} />
             <Route path="/login" element={<Login />} />
              <Route path="/verify-code" element={<VerifyCode />} />
              <Route path="/signup" element={<Register />} />
               <Route path="/dashboard" element={<DashboardPage />} /> 
              {/*<Route path="/order/new" element={<NewOrder />} /> 
              <Route path="/order/1" element={<OrderDetail />} />  */}
            </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;