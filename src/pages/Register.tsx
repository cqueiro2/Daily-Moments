import React, { useState } from 'react';
import {Redirect } from 'react-router-dom';
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
  IonToolbar 
} from '@ionic/react';

import {useAuth} from '../auth';
import {auth} from '../firebase';



/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import '../theme/variables.css';






const Register: React.FC = () => {
  const {loggedIn} = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState({loading:false, error:false})
 

  const handleRegister = async () => {
    try {
     /*   console.log('should login with', {email, password}); */
     setStatus({loading: true, error: false})
    const credential = await  auth.createUserWithEmailAndPassword(email, password)    
    console.log("credential:", credential);
    }catch(error) {
      setStatus({loading: false, error: true})
      console.log('error:', error)
    }
  
   };

  if(loggedIn){
    return <Redirect to="/my/entries"/>;
  }
    return (
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Login</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonList>
              <IonItem>
                <IonLabel position="stacked">Email</IonLabel>
                <IonInput type="email" value={email}
                onIonChange={(event) => setEmail(event.detail.value!)}
                />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Password</IonLabel>
                <IonInput type="password" value={password}
                 onIonChange={(event) => setPassword(event.detail.value!)}
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
             Already have an account?
            </IonButton>
            <IonLoading isOpen={status.loading} /> 
          </IonContent>
        </IonPage>
      );
    };
    
export default Register;
