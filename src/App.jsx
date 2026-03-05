import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import AiChat from './pages/AiChat';
import './index.css';

function App() {
  return (
    <Router>
      <Navigation />
      <main style={{ paddingTop: '80px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ai-assistant" element={<AiChat />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
