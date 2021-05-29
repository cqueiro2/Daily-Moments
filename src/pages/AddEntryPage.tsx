import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTextarea,
  IonTitle,
  IonToolbar,
  isPlatform,
} from '@ionic/react';
import { CameraResultType, Plugins } from '@capacitor/core';
import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import { useAuth } from '../auth';
import { firestore, storage } from "../firebase";
const { Camera } = Plugins;

async function savePicture(blobUrl: string, userId: string) {
  const pictureRef = storage.ref(`/users/${userId}/${Date.now()}`);
  const response = await fetch(blobUrl);
  const blob = await response.blob();
  const snapshot = await pictureRef.put(blob);
  const url = await snapshot.ref.getDownloadURL();
  console.log('saved picture:', url);
  return url;
}

const AddEntryPage: React.FC = () => {
  const { userId } = useAuth();
  const history = useHistory();
  const [date, setDate] = useState<string | null | undefined>('');
  const [title, setTitle] = useState<string | null | undefined>('');
  const [description, setDescription] = useState<string | null | undefined>('');
  const [pictureUrl, setPictureUrl] = useState('/assets/placeholder.png');

  const fileInputRef = useRef<any>();

  useEffect(() => {
    return () => {
      if (pictureUrl.startsWith('blob:')) {
        URL.revokeObjectURL(pictureUrl);
      }
    }
  }, [pictureUrl])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const { files } = event.target
      if (files.length && files.length > 0) {
        const file = files.item(0)
        const pictureUrl = URL.createObjectURL(file);
        setPictureUrl(pictureUrl);
      }
    }
  }

  const handlePictureClick = async () => {
    if (isPlatform('capacitor')) {
      try {
        const photo = await Camera.getPhoto({
          resultType: CameraResultType.Uri
        })

        if (photo.webPath) {
          setPictureUrl(photo.webPath)
        }
      } catch (error) {
        console.log('Camera error:', error);
      }
    } else {
      fileInputRef.current.click();
    }
  }

  const handleSave = async () => {
    const entriesRef = firestore.collection('users').doc(userId)
      .collection('entries');
    const entryData = { date, title, pictureUrl, description };
    // make sure that the image is not the placeholder image 
    if (!pictureUrl.startsWith('/assets') && userId) {
      entryData.pictureUrl = await savePicture(pictureUrl, userId);
    }
    const entryRef = await entriesRef.add(entryData);
    console.log('saved!', entryRef.id)
    history.goBack();
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Add Entry</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem>
            <IonLabel position="stacked">Date</IonLabel>
            <IonDatetime value={date}
              onIonChange={(event) => setDate(event.detail.value)} />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Title</IonLabel>
            <IonInput value={title}
              onIonChange={(event) => setTitle(event.detail.value)} />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Picture</IonLabel>
            <br />
            <input type="file" accept="image/*" hidden ref={fileInputRef}
              onChange={handleFileChange} />
            <img src={pictureUrl} alt="" style={{ cursor: 'pointer' }}
              onClick={handlePictureClick}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Description</IonLabel>
            <IonTextarea value={description}
              onIonChange={(event) => setDescription(event.detail.value)} />
          </IonItem>
          <IonButton expand="block" onClick={handleSave}>Save</IonButton>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default AddEntryPage;
