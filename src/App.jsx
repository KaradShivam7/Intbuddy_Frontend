import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Card from './Components/Card';
import Login from './Components/Login';
import Registration from "./Components/Registration";
import './App.css';
import About from "./Components/About";
import Footer from "./Components/Footer";
import Benefits from "./Components/Benefit";
import ExperianceForm from "./Components/ExperianceFrom";
import Contact from "./Components/Contact";
import SearchPage from "./Components/SearchPage";
import CommunityPage from "./Pages/CommunityPage";
import RewardsPage from "./Pages/RewardsPage";
import PublishPage from "./Pages/PublishPage";
import MentorshipPage from "./Pages/MentorshipPage";
import InterviewAI from "./Components/AI/InterviewAI";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";


import ExperianceForm2 from "./Components/ExperianceFrom2";
import CustomerDashboard from "./Components/Dashboard";

function App() {
  const location = useLocation();
  const hideFooter = location.pathname === "/CustomerDashboard";

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={
          <>
            <Home />
            <Benefits />
            <About/>
            <Card />
            <Contact/>
          </>
        } />
          <Route path="/Home" element={<Home />} />
          <Route path="/Contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Registration" element={<Registration />} />
        <Route path="/About" element={<About />} />
        <Route path="/ExperianceForm" element={<ExperianceForm />} />
        <Route path="/CustomerDashboard" element={<CustomerDashboard />} />
        <Route path="/ExperianceForm2" element={<ExperianceForm2 />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/rewards" element={<RewardsPage />} />
        <Route path="/publish" element={<PublishPage />} />
        <Route path="/mentorship" element={<MentorshipPage />} />
      </Routes>
         <InterviewAI/>

      {!hideFooter && <Footer />}
    </>
  );
}

export default App;