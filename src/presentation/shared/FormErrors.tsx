import { IonText } from '@ionic/react';

interface FormErrorsProps {
  errors: string[];
}

const FormErrors: React.FC<FormErrorsProps> = ({ errors }) => {
  if (errors.length === 0) return null;

  return (
    <IonText color="danger">
      <ul>
        {errors.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
    </IonText>
  );
};

export default FormErrors;
