import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import FeaturedProjects from './components/FeaturedProjects.jsx';
import AboutMe from './components/AboutMe.jsx';
import Skills from './components/Skills.jsx';
import Contact from './components/Contact.jsx';
import Blog from './components/Blog.jsx';
import BlogPost from './components/BlogPost.jsx';
import Footer from './components/Footer.jsx';
import ProjectPage from './components/ProjectPage.jsx';
import Mind from './components/Mind.jsx';
import Builds from './components/Builds.jsx';
import Insights from './components/Insights.jsx';
import Connect from './components/Connect.jsx';
import Core from './components/Core.jsx';
import SubPage from './components/SubPage.jsx';
import Loader from './components/Loader.jsx';
import NotFound from './components/NotFound.jsx';
import UnderConstruction from './components/UnderConstruction.jsx';
import './styles/index.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <div className="min-h-screen">
        {isLoading ? (
          <div className="fixed inset-0 flex items-center justify-center bg-[#023047] z-[200]">
            <Loader />
          </div>
        ) : (
          <>
            <Navbar />
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Hero />
                    <FeaturedProjects />
                    <AboutMe />
                    <Skills />
                    <Blog />
                    <Contact />
                  </>
                }
              />
              <Route path="/project1" element={<ProjectPage projectId="project1" />} />
              <Route path="/project2" element={<ProjectPage projectId="project2" />} />
              <Route path="/project3" element={<ProjectPage projectId="project3" />} />
              <Route path="/project4" element={<ProjectPage projectId="project4" />} />
              <Route path="/blog/:postId" element={<BlogPost />} />
              <Route path="/mind" element={<Mind />} />
              <Route path="/builds" element={<UnderConstruction />} />
              <Route path="/insights" element={<UnderConstruction />} />
              <Route path="/connect" element={<UnderConstruction />} />
              <Route path="/core" element={<UnderConstruction />} />
              <Route path="/:page/sub1" element={<UnderConstruction />} />
              <Route path="/:page/sub2" element={<UnderConstruction />} />
              <Route path="/:page/seemore" element={<UnderConstruction />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer /> {/* Moved outside Routes to render on all pages */}
          </>
        )}
      </div>
    </Router>
  );
}

export default App;