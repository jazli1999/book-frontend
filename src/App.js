import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useGetUserInfoQuery } from './slices/user.api.slice';

import * as Pages from './pages';
import utils from './utils';

import { setName } from './slices/user.slice';
import './App.less';

function App() {
  const token = utils.getJWT();
  const username = useSelector((state) => state.user.username);
  if (!username) {
    const { data, isSuccess } = useGetUserInfoQuery();
    if (isSuccess) {
      const dispatch = useDispatch();
      dispatch(setName(data.firstName));
    }
  }

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
            <Route path="user/profile/:id" element={<Pages.BookmateProfilePage />} />
            <Route path="orders" element={<Pages.OrderListPage />} />
            <Route path="orders/transaction/:id" element={<Pages.Stepper />} />
            <Route path="bookmates/list" element={<Pages.CurrentBookMateList />} />

          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
