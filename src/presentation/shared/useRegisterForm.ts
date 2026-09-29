import { useState } from 'react';
import { ValidationError } from '../../application/shared/ValidationError';

/** Estado común de los formularios de registro: guardando, errores y mensaje de éxito. */
export const useRegisterForm = (successText: string) => {
  const [errors, setErrors] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const submit = async (action: () => Promise<void>): Promise<boolean> => {
    setIsSaving(true);
    setErrors([]);
    try {
      await action();
      setSuccessMessage(successText);
      return true;
    } catch (error) {
      if (error instanceof ValidationError) {
        setErrors(error.messages);
      } else {
        console.error(error);
        setErrors(['No se pudo guardar. Intenta de nuevo.']);
      }
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const clearSuccess = () => setSuccessMessage('');

  return { errors, successMessage, isSaving, submit, clearSuccess };
};
