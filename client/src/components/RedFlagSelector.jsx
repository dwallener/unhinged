import React, { useState } from 'react';

const RED_FLAGS = [
  'Emotionally unavailable',
  'Always on my phone',
  'Can’t commit',
  'Workaholic',
  'Needs constant validation',
  'Ghosts for days',
  'Overshares on social media',
  'Late to everything',
  'Jealous easily',
  'Fell in love with my therapist',
  'Still talks to my ex',
  'Avoids serious conversations',
  'Drinks a little too much',
  'Never leaves hometown',
  'Thinks astrology is real science',
  'Redownloads dating apps mid-relationship',
];

export default function RedFlagSelector({ onSubmit, title  }) {
  const [selected, setSelected] = useState([]);

  const toggleFlag = (flag) => {
    setSelected((prev) =>
      prev.includes(flag)
        ? prev.filter((f) => f !== flag)
        : [...prev, flag]
    );
  };

  const handleContinue = () => {
    if (onSubmit) onSubmit(selected);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-red-600">
        {title}
      </h1>

      <div className="flex flex-wrap justify-center gap-3 max-w-2xl">
        {RED_FLAGS.map((flag) => (
          <button
            key={flag}
            onClick={() => toggleFlag(flag)}
            className={`px-4 py-2 rounded-full border transition font-medium text-sm sm:text-base
              ${
                selected.includes(flag)
                  ? 'bg-red-500 text-white border-red-500 shadow-md scale-105'
                  : 'bg-gray-100 text-gray-800 border-gray-300 hover:bg-red-100 hover:scale-105'
              }`}          >
            {flag}
          </button>
        ))}
      </div>

      <button
        onClick={handleContinue}
        disabled={selected.length === 0}
        className={`mt-8 px-6 py-3 rounded-lg font-semibold transition 
          ${
            selected.length > 0
              ? 'bg-red-600 text-white hover:bg-red-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
      >
        Continue
      </button>
    </div>
  );
}

