
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AdminHomeP from './Pages/AdminHomeP';
import HomeP from './Pages/HomeP';
import LoginP from './Pages/LoginP';
import SignupP from './Pages/signupP'


function App() {

  return (
    <div>

      <Router>
        
        <Routes>
          <Route exact path='/' element={<HomeP />} />
          <Route path='/signup' element={<SignupP />} />
          <Route path='/login' element={<LoginP />} />
          <Route path='/admin' element={<AdminHomeP />} />

        </Routes>
      </Router>



    </div >
  );
}

export default App;
