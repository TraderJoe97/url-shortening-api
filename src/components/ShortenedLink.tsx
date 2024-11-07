// returns containing shortened links and a button to copy to clipboard
import { useState,useEffect } from "react";
const [shortenedLinks, setShortenedLinks] = useState<string[]>([]);

const shortenedLinksdiv = () {
    return (
        <div>
            {shortenedLinks.map((link, index) => (
                <div key={index}>
                    <a href={link} target="_blank" rel="noopener noreferrer">{link}</a>
                    <button onClick={() => navigator.clipboard.writeText(link)}>Copy to clipboard</button>
                </div>
            ))}
        </div>
    );
}
export default shortenedLinksdiv;