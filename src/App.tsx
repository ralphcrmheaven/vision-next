import './App.css'
import { Route, Routes } from 'react-router-dom'
import Base from './layout/Base'
import Home from './pages/Home'
import Conference from './pages/Conference'
import Settings from './pages/Settings'
import Meetings from './pages/Meetings'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Base />}>
        <Route index element={<Home />} />
        <Route path="/conference" element={<Conference />} />
        <Route path="/meetings" element={<Meetings />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  )
}

export default App
