// import logo from './logo.svg';
import './App.css';
import Content from './components/Content';
import VideoPage from './components/VideoPage'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Modal from './components/Modal';

export const config = {
  configip:'https://403e89d2-0f71-4db6-b4ed-18ea5f5ad7fd.mock.pstmn.io'
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
