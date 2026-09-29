import { useState, type FormEvent } from 'react';
import {
  IonButton, IonContent, IonHeader, IonInput, IonPage, IonTitle, IonToast, IonToolbar,
} from '@ionic/react';
import { registerPerson } from '../../container';
import FormErrors from '../shared/FormErrors';
import { useRegisterForm } from '../shared/useRegisterForm';

const RegisterPersonPage: React.FC = () => {
  const [documentNumber, setDocumentNumber] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const { errors, successMessage, isSaving, submit, clearSuccess } = useRegisterForm('Persona registrada.');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const saved = await submit(() => registerPerson.execute({ documentNumber, firstName, lastName }));
    if (saved) {
      setDocumentNumber('');
      setFirstName('');
      setLastName('');
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Registro de personas</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <form onSubmit={handleSubmit}>
          <IonInput
            label="Documento"
            labelPlacement="stacked"
            inputmode="numeric"
            value={documentNumber}
            onIonInput={(event) => setDocumentNumber(event.detail.value ?? '')}
          />
          <IonInput
            label="Nombres"
            labelPlacement="stacked"
            value={firstName}
            onIonInput={(event) => setFirstName(event.detail.value ?? '')}
          />
          <IonInput
            label="Apellidos"
            labelPlacement="stacked"
            value={lastName}
            onIonInput={(event) => setLastName(event.detail.value ?? '')}
          />
          <FormErrors errors={errors} />
          <IonButton type="submit" expand="block" disabled={isSaving}>
            Registrar persona
          </IonButton>
        </form>
        <IonToast isOpen={successMessage !== ''} message={successMessage} duration={2000} onDidDismiss={clearSuccess} />
      </IonContent>
    </IonPage>
  );
};

export default RegisterPersonPage;