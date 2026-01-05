import React, { useState } from 'react';
import { checkConnection } from '../services/api';

const CheckConnection = () => {
  const [status, setStatus] = useState<string>(''); 
  const [message, setMessage] = useState<string>('');  
  const [isLoading, setIsLoading] = useState<boolean>(false); 

  const handleClick = async () => {
    setIsLoading(true); 
    setStatus('Checking...');
    setMessage(''); 
    
    try {
      const result = await checkConnection();
      setStatus(`Server status: ${result.status}`);
      setMessage(result.message); 
    } catch (error) {
      setStatus('Connection failed');
      setMessage('Could not connect to the server');
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div>
      <button onClick={handleClick} disabled={isLoading}>
        Check Connection
      </button>
      
      {isLoading && <div className="loading-spinner">Loading...</div>}
      
      <div>{status}</div>
      
      {message && <div>{message}</div>} 
    </div>
  );
};

export default CheckConnection;
