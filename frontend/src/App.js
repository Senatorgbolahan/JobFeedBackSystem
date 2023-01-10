import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';

// Pages
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import NewJob from './pages/NewJob';
import Jobs from './pages/Jobs';
import Job from './pages/Job';

// Component
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';


function App() {
  return (
    <>
    <Router>
     <div className='container'>
       <Header/>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/new-job' element={<PrivateRoute/>}>
                <Route path='/new-job' element={<NewJob/>}/>
            </Route>
            <Route path='/jobs' element={<PrivateRoute/>}>
                <Route path='/jobs' element={<Jobs/>}/>
            </Route>
            <Route path='/job/:jobId' element={<PrivateRoute/>}>
                <Route path='/job/:jobId' element={<Job/>}/>
            </Route>
            {/* <Route path='*' element={<>Wrong route</>}/> */}

        </Routes>
     </div>
     </Router>
     <ToastContainer/>
    </>
  );
}

export default App;
