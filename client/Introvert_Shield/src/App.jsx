import './App.css'
import Home from './components/Home'
import { Routes, Route } from 'react-router-dom'
import IntrovertShield from './components/IntrovertShield'
import CreatePlace from './components/CreatePlace'
import UpdatePlace from './components/UpdatePlace'
import Login from './components/Login'
import Signup from './components/Signup'

function App() {
 
  return (
    <>
      <Routes>
        <Route path='/' element= {<IntrovertShield />}></Route>
        <Route path='/home' element= {<Home />}></Route>
        <Route path='/createPlace' element= {<CreatePlace />}></Route>
        <Route path='/UpdatePlace/:id' element={<UpdatePlace />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
      </Routes>

    </>
  )
}

export default App
