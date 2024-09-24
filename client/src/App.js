import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Agregar from "./pages/Agregar";
import Home from "./pages/Home";
import Vista from "./pages/vista";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
      <ToastContainer position='top-center' />
        <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route exact path='/addCompany' element={<Agregar/>} />
          <Route exact path='/update/:Id' element={<Agregar/>} />
          <Route exact path='/view/:Id' element={<Vista/>} />
        </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
