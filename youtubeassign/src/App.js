import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css';
import Hello from './Components/Hello'

const App = () => (
  <BrowserRouter>
  <Routes>
    <Route exact path="/" element={<Hello/>}/>
  </Routes>
  </BrowserRouter>
)
export default App;
