import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { trash } from 'ionicons/icons';
import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { useAuth } from '../auth';
import { formateDate } from '../date';
import { firestore } from '../firebase';
import { Entry, toEntry } from '../models';

interface RouteParams {
  id: string
}

const EntryPage: React.FC = () => {
  const { userId } = useAuth();
  const history = useHistory();
  const { id } = useParams<RouteParams>();
  const [entry, setEntry] = useState<Entry>();
  useEffect(() => {
    const entryRef = firestore.collection('users').doc(userId)
      .collection('entries').doc(id);
    entryRef.get().then((doc) => setEntry(toEntry(doc)))
  }, [userId, id])

  const handleDelete = async () => {
    const entryRef = firestore.collection('users').doc(userId)
      .collection('entries').doc(id);
      await entryRef.delete();
      history.goBack();
  }

  if (!entry) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton />
            </IonButtons>
            <IonTitle>Invalid Entry</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <h2>Error retrieving entry...</h2>
        </IonContent>
      </IonPage>
    )
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>{formateDate(entry.date)}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleDelete}>
              <IonIcon icon={trash} slot="icon-only" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h2>{entry.title}</h2>
        <img src={entry.pictureUrl} alt={entry.title} />
        <p>{entry.description}</p>
      </IonContent>
    </IonPage>
  );
};

export default EntryPage;