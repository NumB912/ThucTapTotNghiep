import React, { useState } from "react";

interface PasswordModalAdvanceProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (password: string) => void;
}

const PasswordModalAdvance = ({ visible, onClose, onConfirm }: PasswordModalAdvanceProps) => {
  const [length, setLength] = useState(12);
  const [useLower, setUseLower] = useState(true);
  const [useUpper, setUseUpper] = useState(true);
  const [useNumber, setUseNumber] = useState(true);
  const [useSpecial, setUseSpecial] = useState(true);
  const [generatedPassword, setGeneratedPassword] = useState("");

  if (!visible) return null;

  const generatePassword = () => {
    let charset = "";
    if (useLower) charset += "abcdefghijklmnopqrstuvwxyz";
    if (useUpper) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (useNumber) charset += "0123456789";
    if (useSpecial) charset += "!@#$%^&*()_+";
    if (!charset) return "";

    let pass = "";
    for (let i = 0; i < length; i++) {
      const idx = Math.floor(Math.random() * charset.length);
      pass += charset[idx];
    }
    setGeneratedPassword(pass);
  };

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded shadow-lg p-6 w-96">
        <h3 className="text-lg font-bold mb-4">Generate Password Advance</h3>

        <div className="mb-3">
          <label>Length: {length}</label>
          <input
            type="range"
            min={6}
            max={32}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="flex flex-col gap-1 mb-3">
          <label>
            <input type="checkbox" checked={useLower} onChange={() => setUseLower(!useLower)} /> Lowercase
          </label>
          <label>
            <input type="checkbox" checked={useUpper} onChange={() => setUseUpper(!useUpper)} /> Uppercase
          </label>
          <label>
            <input type="checkbox" checked={useNumber} onChange={() => setUseNumber(!useNumber)} /> Numbers
          </label>
          <label>
            <input type="checkbox" checked={useSpecial} onChange={() => setUseSpecial(!useSpecial)} /> Special characters
          </label>
        </div>

        <div className="mb-3">
          <button
            onClick={generatePassword}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Generate
          </button>
        </div>

        {generatedPassword && (
          <div className="mb-3">
            <div className="bg-gray-100 p-3 rounded break-all text-center">{generatedPassword}</div>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => navigator.clipboard.writeText(generatedPassword)}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Copy
              </button>
              <button
                onClick={() => onConfirm(generatedPassword)}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
              >
                Confirm
              </button>
            </div>
          </div>
        )}

        <button
          onClick={onClose}
          className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PasswordModalAdvance;
