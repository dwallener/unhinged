import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import RedFlagSelector from './components/RedFlagSelector';

const App = () => {
  const [step, setStep] = useState(1);
  const [myFlags, setMyFlags] = useState([]);
  const [okWithFlags, setOkWithFlags] = useState([]);

  const handleSelfFlags = (flags) => {
    setMyFlags(flags);
    setStep(2);
  };

  const handleToleratedFlags = async (flags) => {
    setOkWithFlags(flags);
  
    const payload = {
      selfFlags: myFlags,
      okWithFlags: flags,
    };
  
    try {
      const response = await fetch('http://localhost:8000/api/submit-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
  
      const result = await response.json();
      if (result.success) {
        alert('Profile saved! 🧠 You are now part of the unhinged dating pool.');
      } else {
        alert('Something went wrong. Server said: ' + JSON.stringify(result));
      }
    } catch (err) {
      console.error(err);
      alert('Failed to save profile. Check the console.');
    }
  };

  return (
    <>
      {step === 1 && (
        <RedFlagSelector
          onSubmit={handleSelfFlags}
          title="What are your red flags?"
        />
      )}
      {step === 2 && (
        <RedFlagSelector
          onSubmit={handleToleratedFlags}
          title="What red flags are you probably okay with in others?"
        />
      )}
    </>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);