import React from 'react';
import { 
  IonContent, 
  IonPage,  
 
} from '@ionic/react';




const NotFound: React.FC = () => {
    return (
        <IonPage>         
          <IonContent className="ion-padding">
          Page not found.      
          </IonContent>
        </IonPage>
      );
    };
    
export default NotFound;
