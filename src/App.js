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
  ROUTE_PATH_HistoryPage, ROUTE_PATH_HomePage, ROUTE_PATH_LikePage, ROUTE_PATH_LoginPage, ROUTE_PATH_Mockman, ROUTE_PATH_PlayListPage
  , ROUTE_PATH_PlayListPage_Individual, ROUTE_PATH_ProfilePage, ROUTE_PATH_SignupPage, ROUTE_PATH_Unkown, ROUTE_PATH_VideoContentPage, ROUTE_PATH_VideoListingPage,
  ROUTE_PATH_WatchLaterPage
} from './utils/Route'
import { useAuth } from './context/AuthContext';
import IndividualPlayList from './pages/PlaylistManagmentPage/IndividualPlayList/IndividualPlayList';
import PageNotFound404 from './pages/404/PageNotFound404';
import { ToastContainer } from 'react-toastify';
import LikePage from './pages/LikedPage/LikePage';
import ProfilePage from './pages/ProfilePage/ProfilePage';

function App() {
  const { login, setlogin } = useAuth();
  console.log(login);
  return (
    <div className="App">
      <header className="">
        <Routes >
          <Route element={<Main />}>
            <Route path={ROUTE_PATH_HomePage} element={<Homepage />} />
            <Route path={ROUTE_PATH_PlayListPage} element={login ? <PlaylistPage /> : <Navigate to={ROUTE_PATH_LoginPage} replace />} />
            <Route path={ROUTE_PATH_PlayListPage_Individual} element={login ? <IndividualPlayList /> : <Navigate to={ROUTE_PATH_LoginPage} replace />} />

            <Route path={ROUTE_PATH_WatchLaterPage}
              element={login ? <WatchLater /> : <Navigate to={ROUTE_PATH_LoginPage} replace />} />
            <Route path={ROUTE_PATH_VideoListingPage} element={<VideoListingPage />} />
            <Route path={ROUTE_PATH_HistoryPage}
              element={login ? <HistortyPage /> : <Navigate to={ROUTE_PATH_LoginPage} replace />} />
            <Route path={ROUTE_PATH_LikePage}
              element={login ? <LikePage /> : <Navigate to={ROUTE_PATH_LoginPage} replace />} />

            <Route path={ROUTE_PATH_VideoContentPage} element={<VideoContentPage />} />
            <Route path={ROUTE_PATH_Unkown} element={<PageNotFound404 />} />
            <Route path={ROUTE_PATH_ProfilePage}
              element={login ? <ProfilePage /> : <Navigate to={ROUTE_PATH_LoginPage} replace />} />
          </Route>
          <Route path={ROUTE_PATH_LoginPage}
            element={!login ? <LoginPage /> : <Navigate to="/" replace />} />
          <Route path={ROUTE_PATH_SignupPage}
            element={!login ? <SignupPage /> : <Navigate to="/" replace />} />
          <Route path={ROUTE_PATH_Mockman} element={<div className='MockAPI'><Mockman /></div>} />
        </Routes>
      </header>
      <ToastContainer style={{ fontSize: "1.5em" }} />
    </div>
  );
}

export default App;
