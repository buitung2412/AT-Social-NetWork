import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PageRender from './customRouter/PageRender';

import Home from "./pages/home"
import Login from "./pages/login"
import Register from "./pages/register"

import Alert from './components/alert/Alert'
import Header from './components/header/Header'
import StatusModal from './components/StatusModal';

import { useSelector, useDispatch} from 'react-redux'
import { refreshToken } from './redux/actions/authAction';
import { getPosts } from './redux/actions/postAction'
import { getSuggestions } from'./redux/actions/suggestionsAction'

import io from 'socket.io-client'
import { GLOBALTYPES } from './redux/actions/globalTypes'
import SocketClient from './SocketClient'

import { getNotifies } from './redux/actions/notifyAction';

function App() {

  const { auth, status, modal } = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(refreshToken())

    const socket = io()

    dispatch({type: GLOBALTYPES.SOCKET, payload: socket})
    return () => socket.close()

  },[dispatch])

  useEffect(() => {
    if(auth.token)
    { dispatch(getPosts(auth.token))
      dispatch(getSuggestions(auth.token))
      dispatch(getNotifies(auth.token))

    }
  }, [dispatch, auth.token])

  return (
    <Router>

      <Alert />

      <input type="checkbox" id="theme" />
      <div className={`App ${(status || modal) && 'mode'} `}>
        
        <div className="main">
          {auth.token && <Header />}
          {status && <StatusModal />}
          {auth.token && <SocketClient />}

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
