import React, { useEffect, useState } from 'react';
import { getUserVariables, saveUserVariables } from '../utils/variablesStorage';

const VariablesPage: React.FC = () => {
  const [variables, setVariables] = useState<Record<string, string>>({});

  useEffect(() => {
    const stored = getUserVariables();
    setVariables(stored);
  }, []);

  const handleKeyChange = (oldKey: string, newKey: string) => {
    const updated: Record<string, string> = {};
    Object.entries(variables).forEach(([key, val]) => {
      if (key === oldKey) {
        updated[newKey] = val;
      } else {
        updated[key] = val;
      }
    });
    setVariables(updated);
  };

  const handleValueChange = (key: string, value: string) => {
    setVariables({ ...variables, [key]: value });
  };

  const removeVariable = (key: string) => {
    const updated = Object.fromEntries(
      Object.entries(variables).filter(([k]) => k !== key)
    );
    setVariables(updated);
  };

  const addVariable = () => {
    const uniqueKey = `NEW_VAR_${Date.now()}`;
    setVariables({ ...variables, [uniqueKey]: '' });
  };

  const saveChanges = () => {
    saveUserVariables(variables);
  };

  return (
    <div>
      <h2 className="header-page">Variables</h2>
      <button onClick={addVariable}>Add Variable</button>
      <div>
        {Object.entries(variables).map(([key, value]) => (
          <div key={key} className="variable-row">
            <input
              placeholder="Variable Name"
              value={key}
              onChange={(e) => handleKeyChange(key, e.target.value)}
            />
            <input
              placeholder="Value"
              value={value}
              onChange={(e) => handleValueChange(key, e.target.value)}
            />
            <button
              className="remove-btn"
              onClick={() => removeVariable(key)}
              title="Remove"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
      <button onClick={saveChanges}>Save</button>
    </div>
  );
};

export default VariablesPage;
