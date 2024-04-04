import './App.css'
import Home from './components/Home'
import { Routes, Route } from 'react-router-dom'
import IntrovertShield from './components/IntrovertShield'
import CreatePlace from './components/CreatePlace'
// import Post from './components/Post'

function App() {
 
  return (
    <>
      <Routes>
        <Route path='/' element= {<IntrovertShield />}></Route>
        <Route path='/home' element= {<Home />}></Route>
        <Route path='/createPlace' element= {<CreatePlace />}></Route>
      </Routes>

    </>
  )
}

export default App
