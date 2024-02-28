import './App.css';
import {Route, Routes} from 'react-router-dom';
import Home from './Containers/Home/Home';
<<<<<<< HEAD
import Toolbar from './Components/UI/Toolbar/Toolbar';
import Register from './Features/users/Register/Register';
import Login from './Features/users/Login/Login';
=======
>>>>>>> origin/main
const App = () => {

  return (
    <>
      <header>
<<<<<<< HEAD
         <Toolbar/>
=======
          <h1>Header</h1>
>>>>>>> origin/main
      </header>
      <main className="mt-5">
        <Routes>
          <Route path="/" element={<Home/>}/>
<<<<<<< HEAD
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="*" element={(<h1>Not found</h1>)}/>
=======
>>>>>>> origin/main
        </Routes>
      </main>

    </>
  );
};

export default App;
