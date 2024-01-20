import { Route, Routes } from 'react-router'
import Login from './pages/Login'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Login />}/>
      <Route path='/home' element={<h1>Home</h1>}/>
    </Routes>
  )
}

export default App
