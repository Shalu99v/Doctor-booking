import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import MainPage from './Pages/MainPage'; // Import the MainPage component
import DocLogin from './Pages/DocLogin/DocLogin';
import DocHome from './Pages/DocHome/DocHome';
import AddSlots from './Pages/DocAddSlots/AddSlots';
import DocBookings from './Pages/Docbookings/Docbookings';
import PrivateRoute from './components/PrivateRoutes';
import DocsignUp from './Pages/DocSignUp/DocsignUp';
import UserSignUp from './Pages/UserSignUp/UserSignUp';
import UserLogin from './Pages/UserLogin/UserLogin';
import UserHome from './Pages/UserHome/UserHome';
import DocProfile from './Pages/DocProfile/DocProfile';
import FindDoctors from './Pages/UserFindDoctors/FindDoctors';
import UserProfile from './Pages/UserProfile/UserProfile';
import UserBookings from './Pages/UserBookings/UserBookings';
import MyAppointments from './Pages/MyAppoinments/MyAppointments';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} /> {/* Add the Main Page route */}
      <Route path="/doctor/login" element={<DocLogin />} />
      <Route path="/doctor/signup" element={<DocsignUp />} />
      <Route path="/user/login" element={<UserLogin />} />
      <Route path="/user/signup" element={<UserSignUp />} />

      <Route element={<PrivateRoute role="DOCTOR" />}>
        <Route path="/doctor/home" element={<DocHome />} />
        <Route path="/doctor/addslots" element={<AddSlots />} />
        <Route path="/doctor/bookings" element={<DocBookings />} />
        <Route path="/doctor/:id" element={<DocBookings />} />
        <Route path="/doctor/profile" element={<DocProfile />} />
      </Route>
      
      <Route element={<PrivateRoute role="USER" />}>
        <Route path="/user/home" element={<UserHome />} />
        <Route path="/user/make-appointment/:id" element={<UserBookings />} />
        <Route path="/user/find-doctors" element={<FindDoctors />} />
        <Route path="/user/my-appointments" element={<MyAppointments />} />
        <Route path="/user/profile" element={<UserProfile />} />
      </Route>
    </Routes>
  );
};

export default App;
