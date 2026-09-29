import { useState, type FormEvent } from 'react';
import {
  IonButton, IonContent, IonHeader, IonInput, IonPage, IonTitle, IonToast, IonToolbar,
} from '@ionic/react';
import { registerProduct } from '../../container';
import FormErrors from '../shared/FormErrors';
import { useRegisterForm } from '../shared/useRegisterForm';

/** Campo vacío se convierte en NaN para que la validación lo rechace (Number('') sería 0). */
const toNumber = (value: string): number => (value.trim() === '' ? Number.NaN : Number(value));

const RegisterProductPage: React.FC = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const { errors, successMessage, isSaving, submit, clearSuccess } = useRegisterForm('Producto registrado.');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const saved = await submit(() => registerProduct.execute({ name, price: toNumber(price) }));
    if (saved) {
      setName('');
      setPrice('');
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Registro de productos</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <form onSubmit={handleSubmit}>
          <IonInput
            label="Nombre"
            labelPlacement="stacked"
            value={name}
            onIonInput={(event) => setName(event.detail.value ?? '')}
          />
          <IonInput
            label="Precio"
            labelPlacement="stacked"
            type="number"
            inputmode="decimal"
            value={price}
            onIonInput={(event) => setPrice(event.detail.value ?? '')}
          />
          <FormErrors errors={errors} />
          <IonButton type="submit" expand="block" disabled={isSaving}>
            Registrar producto
          </IonButton>
        </form>
        <IonToast isOpen={successMessage !== ''} message={successMessage} duration={2000} onDidDismiss={clearSuccess} />
      </IonContent>
    </IonPage>
  );
};

export default RegisterProductPage;
