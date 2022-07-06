// import { Route, Routes } from 'react-router-dom';
import './App.css';
// import Character from './pages/Character';
// import CharactersList from './pages/CharactersList';
// import Mutations from './pages/Mutations';
// import Search from './pages/Search';

import AddUserForm from "./components/AddUserForm";
import UserList from "./components/UserList";

function App() {
  return (
    <main className="App">    
      <AddUserForm /> 
      <UserList />                
    </main>
  );
}

export default App;