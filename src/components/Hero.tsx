import React from 'react';

interface HeroProps {
  title: string;
  subtitle: string;
  buttonText: string;
  imageUrl: string;
  onButtonClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ title, subtitle, buttonText, imageUrl, onButtonClick }) => {
  return (
    <section className="flex flex-col lg:flex-row items-center justify-center h-screen  text-grey px-6">
      <div className="lg:w-1/2 max-w-xl lg:text-left text-center mb-8 lg:mb-0">
        <h1 className="text-4xl lg:text-5xl font-bold mb-4">{title}</h1>
        <p className="text-lg mb-6">{subtitle}</p>
        <a href="#shorten-link-input">
          <button onClick={onButtonClick} className="btnPrimary rounded-full block px-4 py-2 text-white">
          {buttonText}
          </button>
        </a>
      </div>
      <div className="lg:w-1/2 flex justify-center lg:justify-end">
        <img
          src={imageUrl}
          alt="Hero Image"
          className="w-full h-auto max-w-md object-cover "
        />
      </div>
    </section>
  );
};

export default Hero;
