import React, { useEffect, useState } from 'react';
import { getUserVariables, saveUserVariables } from '../utils/variablesStorage';
import { useTranslation } from 'react-i18next';
import Button from '../components/Button';
import Input from '../components/Input';

const VariablesPage: React.FC = () => {
  const { t } = useTranslation();
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
      <h2 className="text-lg text-center text-blue-950 mb-2">
        {t('variables.title')}
      </h2>
      <Button
        className="block mx-auto mb-2"
        size="sm"
        variant="contained"
        color="blue"
        onClick={addVariable}
      >
        {t('variables.add')}
      </Button>
      <div>
        {Object.entries(variables).map(([key, value]) => (
          <div key={key} className="flex space-x-2">
            <Input
              placeholder={t('variables.name')}
              value={key}
              onChange={(e) => handleKeyChange(key, e.target.value)}
              width="half"
              direction="horizontal"
            />
            <Input
              placeholder={t('variables.value')}
              value={value}
              onChange={(e) => handleValueChange(key, e.target.value)}
              width="half"
              direction="horizontal"
            />
            <Button
              size="sm"
              variant="contained"
              color="red"
              className="h-10 w-10 mt-1"
              onClick={() => removeVariable(key)}
              title={t('variables.remove')}
            >
              ✖
            </Button>
          </div>
        ))}
      </div>
      <Button
        className="w-full"
        size="md"
        variant="contained"
        color="blue"
        onClick={saveChanges}
      >
        {t('variables.save')}
      </Button>
    </div>
  );
};

export default VariablesPage;
