import logo from './logo.svg';
import './App.css';
import { Navigate, Route, Routes } from 'react-router';
import Main from './Main';
import Homepage from './pages/HomePage/Homepage';
import PlaylistPage from './pages/PlaylistManagmentPage/PlaylistPage';
import WatchLater from './pages/WatchLater/WatchLater';
import VideoListingPage from './pages/VideoListingPage/VideoListingPage';
import HistortyPage from './pages/HistoryPage/HistortyPage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignUpPage/SignupPage';
import Mockman from 'mockman-js';
import VideoContentPage from './pages/VideoContentPage/VideoContentPage';
import {
  ROUTE_PATH_HistoryPage, ROUTE_PATH_HomePage, ROUTE_PATH_LoginPage, ROUTE_PATH_Mockman, ROUTE_PATH_PlayListPage
  , ROUTE_PATH_SignupPage, ROUTE_PATH_Unkown, ROUTE_PATH_VideoContentPage, ROUTE_PATH_VideoListingPage,
   ROUTE_PATH_WatchLaterPage
} from './utils/Route'
import { useAuth } from './context/AuthContext';

function App() {
  const { login, setlogin } = useAuth();
  return (
    <div className="App">
      <header className="">
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
        {/* <h1>React</h1> */}
        <Routes >
          <Route element={<Main/>}>
            <Route path={ROUTE_PATH_HomePage} element={<Homepage/>} />
            {/* <Route path={ROUTE_PATH_PlayListPage} element={<PlaylistPage />} /> */}
            <Route path={ROUTE_PATH_PlayListPage} element={login ? <PlaylistPage/> : <Navigate to="/" replace/>} />
            <Route path={ROUTE_PATH_WatchLaterPage} element={<WatchLater/>} />
            <Route path={ROUTE_PATH_VideoListingPage} element={<VideoListingPage/>} />
            <Route path={ROUTE_PATH_HistoryPage} element={<HistortyPage/>} />
           
            <Route path={ROUTE_PATH_VideoContentPage} element={<VideoContentPage />} />
            <Route path={ROUTE_PATH_Unkown} element={<Homepage/>} />
          </Route>
          <Route path={ROUTE_PATH_LoginPage} element={<LoginPage />} />
          <Route path={ROUTE_PATH_SignupPage} element={<SignupPage />} />
          <Route path={ROUTE_PATH_Mockman} element={<div className='MockAPI'><Mockman/></div>}/>
        </Routes>
      </header>
    </div>
  );
}

export default App;
