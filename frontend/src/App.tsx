import './App.css';
import {Route, Routes} from 'react-router-dom';
import Home from './Containers/Home/Home';
import Toolbar from './Components/UI/Toolbar/Toolbar';
import Register from './Features/users/Register/Register';
import Login from './Features/users/Login/Login';
import AddNewPost from './Containers/AddNewPost/AddNewPost';
const App = () => {

  return (
    <>
      <header>
        <Toolbar/>
      </header>
      <main className="mt-5">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/new-post" element={<AddNewPost/>}/>
          <Route path="*" element={(<h1>Not found</h1>)}/>
        </Routes>
      </main>

    </>
  );
};

export default App;