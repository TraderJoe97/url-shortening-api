import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DOMPurify from 'dompurify';


interface shortenedLinkProps {
  short: string;
  long: string;
}
const LinkShortener: React.FC = () => {
  const [link, setLink] = useState<string>('');
  const [shortenedLinks, setShortenedLinks] = useState(()=> {
    const savedLinks = localStorage.getItem('savedLinks');
    return savedLinks ? JSON.parse(savedLinks) : []; });
  const [error, setError] = useState<string | null>(null);
  const [errorHtml, setErrorHtml] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // load shortened links from local storage on component mount
  useEffect(() => {
    const savedLinks = localStorage.getItem('savedLinks')
    if (savedLinks) {
      setShortenedLinks(JSON.parse(savedLinks));
    }
  }, []); // Empty dependency array to run only once on component mount

  // update  local storage whenever shortenedLinks changes
  useEffect(() => {
    localStorage.setItem('savedLinks', JSON.stringify(shortenedLinks));
  }, [shortenedLinks]); 
   
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value);
    setError(null); // Clear error on new input
  };

  // copy link to clipboard
  const handleCopyLink = (parentElement: HTMLElement, link: string) => {
    navigator.clipboard.writeText(link).then(() => {
    parentElement.textContent='Copied!';
    }).catch(() => {
      alert('Failed to copy link to clipboard');
    });
  };

  // delete link
  const handleDeleteLink = (shortenedLink: object) => {
    setShortenedLinks(shortenedLinks.filter((link: object) =>(link !== shortenedLink)))
  }

  /**
   * Handle the shortening of a link
   *
   * Shortens a link using the API endpoint, adds it to the list of shortened links
   * and clears the input field.
   *
   * @returns {Promise<void>}
   */
  const handleShortenLink = async () => {
    if (!link) {
      setError('Please add a link.');
      return;
    }

    const isDuplicate = shortenedLinks.some((shortenedLink: shortenedLinkProps) => shortenedLink.long === link);
    if (isDuplicate) {
      setError('This link has already been shortened.');
      return;
    }
    setLoading(true);
    setError(null);
    setErrorHtml(null);

    try {
      const response = await axios.post('.netlify/functions/shortenLink', { url: link }, {
        timeout: 10000,
        responseType: 'text'  // This allows us to receive the response as text
      });
      
      // Check if the response is JSON (expected behavior)
      try {
        const jsonResponse = JSON.parse(response.data);
        const newShortenedLink = { short: jsonResponse.result_url, long: link };
        setShortenedLinks([newShortenedLink, ...shortenedLinks]);
      } catch (jsonError) {
        // If it's not JSON, it's probably HTML
        console.error('Error parsing response as JSON:', jsonError);
        setErrorHtml(response.data);
      }
    } catch (error: any) {
      if (error.response) {
        if (error.response.headers['content-type'].includes('text/html')) {
          setErrorHtml(error.response.data);
        } else {
          setError(`Error: ${error.response.data.error || 'Unknown error occurred'}`);
        }
      } else if (error.code === 'ECONNABORTED') {
        setError('Request timed out. Please try again.');
      } else {
        setError('Failed to shorten the link. Please try again.');
      }
      console.error('Error details:', error);
    } finally {
      setLoading(false);
      setLink('');
    }
  };

  if (errorHtml) {
    return (
      <div 
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(errorHtml) }} 
        className="error-container"
      />
    );
  }

  return (
    <div className="flex mx-auto container flex-col w-full items-center">
      <div className="flex flex-col items-center p-6 rounded-2xl
                    transform -translate-y-1/2 customBackground1 w-3/4">
        <div className="w-full flex flex-col md:flex-row items-center rounded-lg p-2 gap-2">
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
      <div className="container mx-auto">
        {shortenedLinks.length > 0 && (
          <div className="mt-1 w-3/4 mx-auto p-10 text-center">
            <p className="text-gray-600">Saved Links:</p>
            <ul className="w-full space-y-4">
               {shortenedLinks.map((shortenedLink: shortenedLinkProps, index: number) => (
              <li key={index} className="flex flex-col md:flex-row w-full justify-between  items-center p-4 bg-white rounded shadow-md">
                <p className="text-gray-800 break-all text-left flex-1 items-start mr-4">{shortenedLink.long}</p>
                <a
                  href={shortenedLink.short}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-500 underline break-words flex-none mr-4"
                >
                  {shortenedLink.short}
                </a>
                {/* Copy Button */}
                <button
                  onClick={(event) => handleCopyLink(event.target as HTMLElement, shortenedLink.short)}
                  className="bg-cyan-500 text-white px-4 py-2 rounded hover:bg-teal-400 transition duration-300 shadow-md"
                >
                  Copy
                </button>
                {/* Delete Button */}
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300 shadow-md ml-2"
                  onClick={() => handleDeleteLink(shortenedLink)}
                >
                  Delete
                </button>
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
