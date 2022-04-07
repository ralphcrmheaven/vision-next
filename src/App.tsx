import './App.css'
import { Route, Routes } from 'react-router-dom'
import Base from './layout/Base'
import Home from './pages/Home'
import CreateMeeting from './pages/CreateMeeting'
import JoinMeeting from './pages/JoinMeeting'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Base />}>
        <Route index element={<Home />} />
        <Route path="/create-meeting" element={<CreateMeeting />} />
        <Route path="/join-meeting" element={<JoinMeeting />} />
      </Route>
    </Routes>
  )
}

export default App
