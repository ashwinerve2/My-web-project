// src/App.jsx
import React, { useEffect } from 'react';
import NavBar from './Components/NavBar';
import Section from './Components/Section';
import Footer from './Components/Footer';
import './App.css'; // Import the global styles

function App() {
  useEffect(() => {
    // Smooth scroll functionality similar to your script in the original HTML.
    const links = document.querySelectorAll("nav a");
    links.forEach(link => {
      link.addEventListener("click", e => {
        e.preventDefault();
        const sectionId = link.getAttribute("href").substring(1);
        document.getElementById(sectionId).scrollIntoView({
          behavior: "smooth"
        });
      });
    });
  }, []);

  return (
    <div>
      <NavBar />

      <Section 
        id="home" 
        title="Welcome to Our Website" 
        content="This is the home section of our single-page website."
        backgroundColor="#f4f4f4" 
      />

      <Section 
        id="about" 
        title="About Us" 
        content="This section contains information about our company."
        backgroundColor="#ddd" 
      />

      <Section 
        id="services" 
        title="Our Services" 
        content="Details about the services we offer are listed here."
        backgroundColor="#eee" 
      />

      <Section 
        id="contact" 
        title="Contact Us" 
        content="Get in touch through the contact details provided here."
        backgroundColor="#ccc" 
      />

      <Footer />
    </div>
  );
}

export default App;
