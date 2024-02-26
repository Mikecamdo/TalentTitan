import React from "react";
import { Image } from "react-bootstrap"

export const LandingPage = () => {
  return (
    <>
      <header>
        {/* Navigation Bar */}
      </header>
      <main>
        {/* Hero Section */}
        <section id="hero" style={{ textAlign: 'center', padding: '50px', backgroundColor: '#1d3e55' }}>
          <Image src="TalentTitanLogo.png" height={"200"} width={""}></Image>
          {/* <Image src="TalentTitanLogoOnly.png" height={"200"} width={""}></Image>
          <br/>
          <Image src="TalentTitanText.png" height={""} width={"225px"}></Image> */}
          <h1>Welcome to Talent Titan</h1>
          <p>Your journey to the perfect job starts here.</p>
          <button style={{ padding: '10px', fontSize: '16px' }}>Get Started</button>
        </section>
      </main>
      <footer>
        {/* Footer Content */}
      </footer>
    </>
  );
};




