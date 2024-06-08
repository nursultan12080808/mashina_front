import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import MainLayout from './components/layouts/MainLayout.jsx';
import MainPage from './pages/MainPage';
import Profile from './pages/Profile';
import DetailCarPage from './pages/DetailCarPage';
import LoveCars from './pages/LoveCars';
import Login from './pages/Login';
import RegisterUser from './pages/RegisterUser';
import RedactorProfile from './pages/RedactorProfile';
import CreateCar from './pages/CreateCar';
import My_cars from './pages/my_cars';
import UpdateCar from './pages/UpdateCar';
import ChangePassword from './pages/ChangePassword';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<MainLayout/>}>
              <Route index element={<MainPage/>} />
              <Route path='/cars/:id' element={<DetailCarPage />} />
              <Route path='/favorites' element={<LoveCars/>} />
              <Route path='/login' element={<Login/>}/>
              <Route path='/register' element={<RegisterUser/>}/>
              <Route path='/profile' element={<Profile/>}/>
              <Route path='/create-car' element={<CreateCar/>}/>
              <Route path='/workspace' element={<My_cars/>}/>
              <Route path='/update_car/:id' element={<UpdateCar/>}/>
              <Route path='/redactor-profile/:id' element={<RedactorProfile/>}/>
              <Route path='/change-password/:id' element={<ChangePassword/>}/>
            </Route>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
