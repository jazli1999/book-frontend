import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';

import * as Pages from './pages';
import utils from './utils';
import './App.less';

function App() {
  const token = utils.getJWT();

  return (
    <div id="App">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate replace to={token ? '/app' : '/welcome'} />} />
          <Route path="/welcome" element={<Pages.StartPage />} />
          <Route path="/register" element={<Pages.RegistrationPanel />} />

          <Route path="/app" element={<Pages.WebApp />}>
            <Route index element={<Pages.MainPage />} />
            <Route path="main" element={<Pages.MainPage />} />
            <Route path="profile" element={<Pages.ProfilePage />} />
            <Route path="users/:id" element={<Pages.BookmateProfilePage />} />
            <Route path="orders" element={<Pages.OrderListPage />} />
            <Route path="orders/create/:id" element={<Pages.OrderPage create />} />
            <Route path="orders/:id" element={<Pages.OrderPage />} />
            <Route path="bookmates" element={<Pages.CurrentBookMateList />} />
            <Route path="profile/:listType/edit" element={<Pages.BookListEdit />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
