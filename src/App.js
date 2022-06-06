import { 
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';

import * as Pages from './pages';
import './App.less';

function App() {
  return (
    <div id='App'>
      <Router>
        <Routes>
          <Route path='/' element={<Pages.StartPage />} />
          <Route path='/app' element={<Pages.WebApp />}>
            <Route index element={<Pages.MainPage />} />
            <Route path='main' element={<Pages.MainPage />} />
            <Route path='profile' element={<Pages.ProfilePage />} />
          </Route>
        </Routes>  
      </Router>
    </div>
  );
}

export default App;
