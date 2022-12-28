// import logo from './logo.svg';
import './App.css';
import Content from './components/Content';
import VideoPage from './components/VideoPage'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Modal from './components/Modal';

export const config = {
  configip:'http://localhost:8082'
}


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        
        <Route path='/' element={<Content/>}/>
        <Route path='/video/:id' element={<VideoPage/>}/>
        <Route path='/modal' element={<Modal/>}/>
      
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
