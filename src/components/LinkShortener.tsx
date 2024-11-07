import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LinkShortener: React.FC = () => {
  const [link, setLink] = useState('');
  const [shortenedLinks, setShortenedLinks] = useState<{ short: string; long: string }[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // load shortened links from local storage on component mount
  useEffect(() => {
    const savedLinks = localStorage.getItem('savedLinks')
    if (savedLinks) {
      setShortenedLinks(JSON.parse(savedLinks));
    }
  }, []); // Empty dependency array to run only once on component mount

  // update  local storage whenever shortenedLinks changes
  useEffect(() => {
    localStorage.setItem('shortenedLinks', JSON.stringify(shortenedLinks));
  }, [shortenedLinks]); 
   
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value);
    setError(null); // Clear error on new input
  };

  const handleShortenLink = async () => {
    if (!link) {
      setError('Please add a link');
      return;
    }

    setLoading(true);
    setError(null);
    

    try {
      const response = await axios.post('/.netlify/functions/shortenLink', { url: link });
      const newShortenedLink = {short:response.data.result_url, long:link};
      setShortenedLinks([newShortenedLink,...shortenedLinks]);
    } catch (error: any) {
      if (error.response) {
        setError(`Error: ${error.response.data.error}`);
      } else {
        setError('Failed to shorten the link. Please try again.');
      }
      console.error(error);
    } finally {
      setLoading(false);
      setLink(''); // Clear input after successful shortening
    }
  };

  return (
    <div className="flex flex-col w-full items-center">
      <div className="flex flex-col items-center p-6 rounded-2xl
                    transform -translate-y-1/2 bg-Dark_Violet bg-[url('@/assets/bg-boost-desktop.svg')] bg-auto w-3/4">
        <div className="w-full flex items-center rounded-lg p-2 gap-2">
          <input
            type="text"
            placeholder="Shorten a link here..."
            value={link}
            onChange={handleInputChange}
            className="flex-1 p-2 text-gray-800 bg-gray-200 rounded outline-none"
            id="shorten-link-input"
          />
          <button
            onClick={handleShortenLink}
            className="bg-Cyan text-white px-4 py-2 rounded hover:bg-teal-400 transition duration-300"
            disabled={loading || !link}
          >
            {loading ? 'Shortening...' : 'Shorten It!'}
          </button>
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
      <div>
        {shortenedLinks.length > 0 && (
          <div className="mt-4 w-full p-10 text-center">
            <p className="text-gray-600">Saved Links:</p>
            <ul>
              {shortenedLinks.map((shortenedLink, index) => (
                <li key={index} className="mt-4 w-full flex flex-wrap gap-5">
                  <div>{shortenedLink.long}</div>
                  <div className="flex flex-wrap gap-5">
                    <a
                    href={shortenedLink.short}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-500 underline break-words"
                    >
                    {shortenedLink.short}
                  </a>
                  {/* button that stores short link to clipboard */}
                  <button className='bg-Cyan text-white px-4 py-2 rounded hover:bg-teal-400 transition duration-300'>
                    copy
                  </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default LinkShortener;
