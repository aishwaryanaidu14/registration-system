import './App.css';
import RegistrationPage from "./Pages/RegistrationPage"
import Update from "./Pages/update"
import ShowData from "./Pages/showdata"
import LoginPage from "./Pages/LoginPage"
import UserPage from "./Pages/UserPage"
import Home from "./Pages/Home"
import AdminPage from "./Pages/AdminPage"
import AdminLogin from "./Pages/AdminLogin"
import { AuthProvider, useAuth } from './Auth';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"


function App() {
  const auth=useAuth()
  return (
    <AuthProvider>
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/showdata" element={<ShowData />}/>
          <Route path="/register" element={<RegistrationPage />}/>
          <Route path="/update" element={<Update />}/>
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/user" element={<UserPage />}/>
          <Route path="/admin" element={<AdminPage />}/>
          <Route path="/adminlogin" element={<AdminLogin />}/>
        </Routes>
      </BrowserRouter>
    </div>
    </AuthProvider>
  );
}

export default App;
