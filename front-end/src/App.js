import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PageRender from './customRouter/PageRender';

import Home from "./pages/home"
import Login from "./pages/login"
import Register from "./pages/register"

import Alert from './components/alert/Alert'
import Header from './components/header/Header';

import { useSelector, useDispatch} from 'react-redux'
import { refreshToken } from './redux/actions/authAction';


function App() {

  const { auth } = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(refreshToken())
  },[dispatch])

  return (
    <Router>

      <Alert />

      <input type="checkbox" id="theme" />
      <div className="App">
        
        <div className="main">
          {auth.token && <Header />}
          <Routes>
            <Route exact path="/" element={auth.token ? <Home /> : <Login />} />
            <Route exact path="/register" element={<Register />} />

            <Route exact path="/:page" element={<PageRender />} />
            <Route exact path="/:page/:id" element={<PageRender />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
