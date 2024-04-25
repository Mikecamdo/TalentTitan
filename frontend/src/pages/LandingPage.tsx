import React from 'react';
import { Image } from 'react-bootstrap';

export const LandingPage = () => {
  // Define CSS properties for hero section with TypeScript's specific type
  const heroStyle: React.CSSProperties = {
    textAlign: 'center',
    padding: '50px',
    backgroundColor: '#1d3e55'
  };

  // Define CSS properties for the button with TypeScript's specific type
  const buttonStyle: React.CSSProperties = {
    padding: '10px',
    fontSize: '16px',
    cursor: 'pointer',  // Makes it clear it's clickable
    backgroundColor: '#4CAF50',  // A more engaging button color
    color: 'white',  // Contrast text color
    border: 'none',
    borderRadius: '5px'
  };

  return (
    <>
      <header>
        {/* Navigation Bar would be placed here */}
      </header>
      <main>
        {/* Hero Section */}
        <section id="hero" style={heroStyle}>
          <Image
            src="TalentTitanLogo.png"
            alt="Talent Titan Logo"  // Adding alt text for accessibility
            height="200"
            width="auto"  // Correcting width to auto for proper scaling
          />
          <h1>Welcome to Talent Titan</h1>
          <p>Your journey to the perfect job starts here.</p>
          <button style={buttonStyle}>Get Started</button>
        </section>
      </main>
      <footer>
        {/* Footer Content would be placed here */}
      </footer>
    </>
  );
};





