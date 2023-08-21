import React, { useState } from 'react';
import './style.css';
import {API_KEY} from '../key.js'
const apiKey=API_KEY
console.log(apiKey);
const Popup: React.FC = () => {
  const [location, setLocation] = useState({ country: '', city: '' });
  const [isLoading, setIsLoading] = useState(false);
  const fetchIpAddress = async () => {
    try {
      setIsLoading(true);
      setLocation({ country: '', city: '' });
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      const ipAddress = data.ip;
      console.log(ipAddress)
      fetchLocationInfo(ipAddress);
    } catch (error) {
      console.error('Error fetching IP address:', error);
      setIsLoading(false);
    }
  };
  
  const fetchLocationInfo = async (ipAddress: string) => {
    try {
      const response = await fetch(`https://ipinfo.io/${ipAddress}/json?token=${apiKey}`);
      const data = await response.json();
      console.log(data)
      if (data.country && data.city) {
        setLocation({ country: data.country, city: data.city });
      } else {
        console.error('Error fetching location info:', data.error);
      }
    } catch (error) {
      console.error('Error fetching location info:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-800" style={{ height: '500px', width: '500px' }}>
      {location.country && location.city && (
        <p className="mb-4 text-white text-xl">
          Your country is {location.country} and city is {location.city}
        </p>
      )}
      <button className="w-80 bg-teal-500 text-black text-xl" style={{ height: '100px' }} onClick={fetchIpAddress}>
        {isLoading ? 'Loading...' : 'Show my location'}
      </button>
    </div>
  );
};

export default Popup;
