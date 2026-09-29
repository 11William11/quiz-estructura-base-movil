import { useState, type FormEvent } from 'react';
import {
  IonButton, IonContent, IonHeader, IonInput, IonPage, IonTitle, IonToast, IonToolbar,
} from '@ionic/react';
import { registerUser } from '../../container';
import FormErrors from '../shared/FormErrors';
import { useRegisterForm } from '../shared/useRegisterForm';

const RegisterUserPage: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const { errors, successMessage, isSaving, submit, clearSuccess } = useRegisterForm('Usuario registrado.');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const saved = await submit(() => registerUser.execute({ fullName, email }));
    if (saved) {
      setFullName('');
      setEmail('');
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Registro de usuarios</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <form onSubmit={handleSubmit}>
          <IonInput
            label="Nombre completo"
            labelPlacement="stacked"
            value={fullName}
            onIonInput={(event) => setFullName(event.detail.value ?? '')}
          />
          <IonInput
            label="Correo"
            labelPlacement="stacked"
            type="email"
            value={email}
            onIonInput={(event) => setEmail(event.detail.value ?? '')}
          />
          <FormErrors errors={errors} />
          <IonButton type="submit" expand="block" disabled={isSaving}>
            Registrar usuario
          </IonButton>
        </form>
        <IonToast isOpen={successMessage !== ''} message={successMessage} duration={2000} onDidDismiss={clearSuccess} />
      </IonContent>
    </IonPage>
  );
};

export default RegisterUserPage;
