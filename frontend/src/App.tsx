import { BrowserRouter,Routes,Route } from 'react-router-dom'
import './App.css'
import { User } from './components/User'
import { Admin } from './components/Admin'
import { Dashboard } from './components/Dashboard'
import {Test} from "./components/Test"

function App() {
  

  return (
    <BrowserRouter>

      <Routes>
          <Route path='/' element={<Dashboard/>}/>
          <Route path='/admin' element={<Admin/>}/>
          <Route path='/user' element={<User/>}/>
          <Route path='/test' element={<Test/>}/>
      </Routes>


     
    </BrowserRouter>
  )
}

export default App
