import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import MainLayout from './components/layout/MainLayout';
import LandingPage from './components/landing/LandingPage';
import ServiceSelection from './components/ServiceSelection';
import DriverBooking from './components/booking/driver/DriverBooking';
import CleaningBooking from './components/booking/cleaning/CleaningBooking';
import ProviderMatches from './components/providers/ProviderMatches';
import ProviderProfile from './components/providers/ProviderProfile';
import ServiGuy from './components/booking/ServiGuy';
import ProvidersLanding from './components/providers/ProvidersLanding';
import ProviderSignup from './components/auth/ProviderSignup';
import ProviderSuccess from './components/providers/ProviderSuccess';
import BookingSuccessScreen from './components/booking/BookingSuccessScreen';
import AccountLayout from './components/account/AccountLayout';
import Profile from './components/account/Profile';
import Bookings from './components/account/Bookings';
import PaymentMethods from './components/account/PaymentMethods';
import Settings from './components/account/Settings';
import Reviews from './components/account/Reviews';
import About from './components/account/About';
import SignIn from './components/auth/SignIn';
import UserSignup from './components/auth/UserSignup';
import ProviderSignIn from './components/auth/ProviderSignIn';
import CommunityChoice from './components/CommunityChoice';
import ProviderDashboard from './components/providers/dashboard/ProviderDashboard';

const App = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/join" element={<CommunityChoice />} />
              
              {/* Auth Routes */}
              <Route path="/auth/signin" element={<SignIn />} />
              <Route path="/auth/signup" element={<UserSignup />} />
              <Route path="/auth/provider/signup" element={<ProviderSignup />} />
              <Route path="/auth/provider/signin" element={<ProviderSignIn />} />

              {/* Main Layout Routes */}
              <Route element={<MainLayout />}>
                <Route path="/services" element={<ServiceSelection />} />
                
                {/* Driver Routes */}
                <Route path="/book/driver" element={<DriverBooking />} />
                <Route path="/book/driver/matches" element={<ProviderMatches />} />
                <Route path="/book/driver/provider/:id" element={<ProviderProfile />} />
                <Route path="/book/driver/success" element={<BookingSuccessScreen />} />
                
                {/* Cleaning Routes */}
                <Route path="/book/cleaning" element={<CleaningBooking />} />
                <Route path="/book/cleaning/matches" element={<ProviderMatches />} />
                <Route path="/book/cleaning/provider/:id" element={<ProviderProfile />} />
                <Route path="/book/cleaning/success" element={<BookingSuccessScreen />} />
                
                {/* Provider Routes */}
                <Route path="/providers" element={<ProvidersLanding />} />
                <Route path="/provider/success" element={<ProviderSuccess />} />
                <Route path="/provider/dashboard" element={<ProviderDashboard />} />
                
                {/* User Account Routes */}
                <Route path="/account" element={<AccountLayout />}>
                  <Route path="profile" element={<Profile />} />
                  <Route path="bookings" element={<Bookings />} />
                  <Route path="payments" element={<PaymentMethods />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="reviews" element={<Reviews />} />
                  <Route path="about" element={<About />} />
                </Route>
                
                {/*AI Agent*/}
                <Route path="/serviguy" element={<ServiGuy />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;