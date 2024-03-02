import {Navigate, Route, Routes} from 'react-router-dom';
import './App.css';
import {useAppSelector} from './app/hooks';
import Toolbar from './Components/UI/Toolbar/Toolbar';
import AddNewPost from './Containers/AddNewPost/AddNewPost';
import Home from './Containers/Home/Home';
import Login from './Features/users/Login/Login';
import Register from './Features/users/Register/Register';
import {selectUser} from './Features/users/UsersSlice';

const App = () => {
  const user = useAppSelector(selectUser);

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
          <Route path="/new-post" element={user ? <AddNewPost/> : <Navigate to='/login' />}/>
          <Route path="*" element={(<h1>Not found</h1>)}/>
        </Routes>
      </main>

    </>
  );
};

export default App;