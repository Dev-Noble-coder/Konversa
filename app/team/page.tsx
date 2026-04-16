import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import TeamSection from '../components/TeamSection';

export const metadata = {
  title: "Meet the Team | Konversa",
  description: "The minds building the future of social commerce in Nigeria.",
};

const TeamPage = () => {
  return (
    <main className="bg-[#020617] min-h-screen">
      <NavBar />
      <div className="pt-20">
        <TeamSection />
      </div>
      <Footer />
    </main>
  );
};

export default TeamPage;
