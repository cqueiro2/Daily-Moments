import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonLoading,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { useAuth } from '../auth';
import { auth } from '../firebase';



const Register: React.FC = () => {
  const { loggedIn } = useAuth()
  const [email, setEmail] = useState<string | null | undefined>('');
  const [password, setPassword] = useState<string | null | undefined>('');
  const [status, setStatus] = useState({ loading: false, error: false });

  const handleRegister = async () => {
    if (email && password) {
      try {
        setStatus({ loading: true, error: false });
        await auth.createUserWithEmailAndPassword(email, password)
      } catch (error) {
        setStatus({ loading: false, error: true });
        console.log(error)
      }
    }
  }

  if (loggedIn) {
    return <Redirect to="/my/entries" />
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Register</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem>
            <IonLabel position="stacked">Email</IonLabel>
            <IonInput type="email" value={email}
              onIonChange={event => setEmail(event.detail.value)}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Password</IonLabel>
            <IonInput type="password" value={password}
              onIonChange={event => setPassword(event.detail.value)}
            />
          </IonItem>
        </IonList>
        {status.error &&
          <IonText color="danger">Registration failed</IonText>
        }
        <IonButton expand="block" onClick={handleRegister}>
          Create Account
        </IonButton>
        <IonButton expand="block" fill="clear" routerLink="/login">
          Already Have an Account?
        </IonButton>
        <IonLoading isOpen={status.loading} />
      </IonContent>
    </IonPage>
  );
};

export default Register;
