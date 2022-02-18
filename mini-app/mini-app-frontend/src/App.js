import { Routes, Route } from 'react-router-dom'
import { GlobalProvider } from './context/GlobalState';
import './App.css';
import SignIn from './components/SignIn';
import Navbar from './components/Navbar';
import SignUp from './components/SignUp';
import Profile from './components/Profile';

function App() {
  return (
    <>
      <GlobalProvider>
        <Navbar />
        <main>
          <Routes>
            <Route path='/' element={<SignIn />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/profile' element={<Profile />} />
          </Routes>
        </main>
      </GlobalProvider>
    </>
  );
}

export default App;
