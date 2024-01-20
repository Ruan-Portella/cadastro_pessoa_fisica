import { Route, Routes } from 'react-router'
import Login from './pages/Login'
import SignUp from './pages/SignUp'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Login />}/>
      <Route path='/signUp' element={<SignUp />}/>
      <Route path='/home' element={<h1>Home</h1>}/>
    </Routes>
  )
}

export default App
