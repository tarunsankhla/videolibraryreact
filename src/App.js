import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router';
import Main from './Main';
import Homepage from './pages/HomePage/Homepage';
import PlaylistPage from './pages/PlaylistManagmentPage/PlaylistPage';
import WatchLater from './pages/WatchLater/WatchLater';
import VideoListingPage from './pages/VideoListingPage/VideoListingPage';
import HistortyPage from './pages/HistoryPage/HistortyPage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignUpPage/SignupPage';
import Mockman from 'mockman-js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
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
        <h1>React</h1>
        <Routes >
          <Route element={<Main/>}>
            <Route path='/' element={<Homepage/>} />
            <Route path="/playlist" element={<PlaylistPage/>} />
            <Route path="/watchlater" element={<WatchLater/>} />
            <Route path="/explore" element={<VideoListingPage/>} />
            <Route path="/history" element={<HistortyPage/>} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="*" element={<Homepage/>} />
          </Route>
          <Route path='/mockman' element={<div className='MockAPI'><Mockman/></div>}/>
        </Routes>
      </header>
    </div>
  );
}

export default App;
