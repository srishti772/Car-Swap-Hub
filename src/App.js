import './App.css';
import Home from './components/Home/Home';
import Search from './components/Search/Search';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import VieworEdit from './components/VieworEdit/VieworEdit';
import Profile from './components/Profile/Profile';
import Wishlist from './components/Wishlist/Wishlist';
import UserDetails from './components/Profile/UserDetails/UserDetails';
import Password from './components/Profile/Password/Password';
import Compare from './components/Compare/Compare';
import AllBookings from './components/MyListings/AllBookings';
import SellCar from './components/SellCar/SellCar';
import Login from './components/LogIn/Login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="search" element={<Search />} />
          <Route path="edit" element={<VieworEdit />} />
          <Route path="view" element={<VieworEdit />} />
          <Route path="compare" element={<Compare />} />
          <Route path="sell" element={<SellCar />} />
          <Route path="login" element={<Login />} />
          <Route path="allbookings" element={<AllBookings />} />
          <Route path="profile" element={<Profile />}>
            <Route path="userdetails" element={<UserDetails />} />
            <Route path="password" element={<Password />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="allbookings" element={<AllBookings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
