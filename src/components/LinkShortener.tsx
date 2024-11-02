import React, { useState } from 'react';
import axios from 'axios';

const LinkShortener: React.FC = () => {
  const [link, setLink] = useState('');
  const [shortenedLink, setShortenedLink] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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
    setShortenedLink(null);

    try {
      const response = await axios.post('https://cleanuri.com/api/v1/shorten', { url: link });
      setShortenedLink(response.data.result_url);
    } catch (error) {
      setError('Failed to shorten the link. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 rounded-2xl
                    absolute top-0 transform -translate-y-1/2 bg-Dark_Violet bg-[url('@/assets/bg-boost-desktop.svg')] bg-auto w-3/4">
      <div className="w-full flex items-center bg-gray-200 rounded-lg p-2">
        <input
          type="text"
          placeholder="Shorten a link here..."
          value={link}
          onChange={handleInputChange}
          className="flex-1 p-2 text-gray-800 bg-transparent outline-none"
        />
        <button
          onClick={handleShortenLink}
          className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-400 transition duration-300"
          disabled={loading}
        >
          {loading ? 'Shortening...' : 'Shorten It!'}
        </button>
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {shortenedLink && (
        <div className="mt-4 w-full text-center">
          <p className="text-gray-600">Shortened Link:</p>
          <a
            href={shortenedLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-500 underline break-words"
          >
            {shortenedLink}
          </a>
        </div>
      )}
    </div>
  );
};

export default LinkShortener;
