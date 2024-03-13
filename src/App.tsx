import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/Home'
import TestPage from './pages/Test'
import CardPage from './pages/Card'
import ScrollToTop from './components/shared/ScrollToTop'
import SigninPage from './pages/Signin'
import SignupPage from './pages/Signup'
import Navbar from '@shared/Navbar'
import PrivateRoute from './components/auth/PrivateRoute'
import ApplyPage from './pages/Apply'
import ApplyDone from './pages/ApplyDone'
import MyPage from './pages/My'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/signin" Component={SigninPage} />
        <Route path="/signup" Component={SignupPage} />
        <Route path="/test" Component={TestPage} />
        <Route path="/card/:id" Component={CardPage} />
        <Route
          path="/apply/:id"
          element={
            <PrivateRoute>
              <ApplyPage />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/apply/done"
          element={
            <PrivateRoute>
              <ApplyDone />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/my"
          element={
            <PrivateRoute>
              <MyPage />
            </PrivateRoute>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
