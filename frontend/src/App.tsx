import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BookingPage from './pages/BookingPage';
import FlightPage from './pages/FlightPage';
import LogbookPage from './pages/LogbookPage';
import AchievementsPage from './pages/AchievementsPage';
import ProfilePage from './pages/ProfilePage';
import BottomNav from './shared/components/BottomNav';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BookingPage />} />
        <Route path="/flight/:sessionId" element={<FlightPage />} />
        <Route path="/logbook" element={<LogbookPage />} />
        <Route path="/achievements" element={<AchievementsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
      <BottomNav />
    </BrowserRouter>
  );
}

export default App;
