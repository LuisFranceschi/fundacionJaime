import React, { useState } from 'react';
import './App.css';
import Carousel from 'react-bootstrap/Carousel';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import VolunteerRegister from './VolunteerRegister';
import AttendanceRegister from './AttendanceRegister';
import LoginPage from './LoginPage';
import AdminPage from './AdminPage';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (username, role) => {
    setUser({ username, role });
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <div>
        <header className="hero">
          <div className="hero-content">
            <h1>Transforming Panama, One Step at a Time</h1>
            <p>Join us in our mission to foster education, civic values, and inclusivity across Panama.</p>
          </div>
          <div className="header-buttons">
            {user ? (
              <div>
                <p>Welcome, {user.username}!</p>
                <button onClick={handleLogout}>Logout</button>
                {user.role === 'admin' && (
                  <Link to="/attendance" className="header-link">Attendance Register</Link>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className="header-link">Login</Link>
                <Link to="/volunteer-register" className="header-link">Volunteer Register</Link>
              </>
            )}
          </div>
        </header>

        <Routes>
          <Route path="/" element={
            <>
              <section className="mission-section">
                <h2>Our Mission</h2>
                <p>We are dedicated to improving the lives of Panamanians through education, community support, and development projects.</p>
              </section>
              <section className="volunteer-section">
                <h2>Volunteer Activity Programs</h2>
                <Carousel>
                  <Carousel.Item>
                    <div className="program-card">
                      <img src="https://example.com/program1.jpg" alt="Program 1" />
                      <h3>Community Education</h3>
                      <p>Join us in providing educational support to children in rural areas.</p>
                    </div>
                  </Carousel.Item>
                  <Carousel.Item>
                    <div className="program-card">
                      <img src="https://example.com/program2.jpg" alt="Program 2" />
                      <h3>Food Distribution</h3>
                      <p>Help us distribute food packages to underserved communities in Panama.</p>
                    </div>
                  </Carousel.Item>
                  <Carousel.Item>
                    <div className="program-card">
                      <img src="https://example.com/program3.jpg" alt="Program 3" />
                      <h3>Environmental Clean-up</h3>
                      <p>Be part of our initiative to clean public spaces and promote sustainability.</p>
                    </div>
                  </Carousel.Item>
                  <Carousel.Item>
                    <div className="program-card">
                      <img src="https://example.com/program4.jpg" alt="Program 4" />
                      <h3>Volunteer marathon for kids with cancer</h3>
                      <p>Help us improve healthcare and support children with cancer.</p>
                    </div>
                  </Carousel.Item>
                </Carousel>
              </section>
              <section className="articles-section">
                <h2>Nuevos Artículos</h2>
                <p>Descubre nuestro enfoque para un Panamá mejor.</p>
                <div className="articles-container">
                  <div className="article-card">
                    <img src="https://example.com/article1.jpg" alt="Article 1" />
                    <h3>Presentación ¡Ruta para el Desarrollo!</h3>
                    <p>Ruta desarrollo Educación.</p>
                    <button className="read-more">Continuar Leyendo</button>
                  </div>
                  <div className="article-card">
                    <img src="https://example.com/article2.jpg" alt="Article 2" />
                    <h3>Presentación ¡Ruta para el Desarrollo!</h3>
                    <p>Ruta desarrollo Arte.</p>
                    <button className="read-more">Continuar Leyendo</button>
                  </div>
                  <div className="article-card">
                    <img src="https://example.com/article3.jpg" alt="Article 3" />
                    <h3>Presentación ¡Ruta para el Desarrollo!</h3>
                    <p>Ruta desarrollo Deporte.</p>
                    <button className="read-more">Continuar Leyendo</button>
                  </div>
                  <div className="article-card">
                    <img src="https://example.com/article4.jpg" alt="Article 4" />
                    <h3>Presentación ¡Ruta para el Desarrollo!</h3>
                    <p>Ruta desarrollo Medio ambiente.</p>
                    <button className="read-more">Continuar Leyendo</button>
                  </div>
                </div>
              </section>
            </>
          } />
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/volunteer-register" element={<VolunteerRegister />} />
          <Route path="/attendance" element={user && user.role === 'admin' ? <AttendanceRegister /> : <Navigate to="/login" />} />
          <Route path="/admin" element={user && user.role === 'admin' ? <AdminPage /> : <Navigate to="/login" />} />
        </Routes>

        <footer className="footer">
          <div className="footer-content">
            <div className="footer-logo">
              <h2>Foundation Name</h2>
            </div>
            <div className="footer-menu">
              <h3>Menú</h3>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about-us">About Us</Link></li>
                <li><Link to="/programs">Programs</Link></li>
              </ul>
            </div>
            <div className="footer-contact">
              <h3>Contacto</h3>
              <p>Ciudad de Panamá</p>
              <p>Email: your@example.com</p>
            </div>
            <div className="footer-social">
              <h3>Redes Sociales</h3>
              <ul>
                <li><a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                <li><a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">X</a></li>
                <li><a href="https://www.threads.net" target="_blank" rel="noopener noreferrer">Threads</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2024 Foundation Name. Todos los Derechos Reservados.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
