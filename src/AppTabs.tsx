import React from "react";
import { Redirect, Route } from "react-router-dom";
import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { home as homeIcon, settings as settingsIcon } from "ionicons/icons";

/* Core CSS required for Ionic components to work properly */

import Settings from "./pages/Settings";
import Home from "./pages/Home";
import Entry from './pages/EntryPage';
import { useAuth } from './auth';


const AppTabs: React.FC = () =>{ 
  const {loggedIn} = useAuth()
 if (!loggedIn){
   return <Redirect to="/login"/>
 }
  return( 
 
      <IonTabs>
        <IonRouterOutlet>         
          <Route exact path="/my/entries">
           <Home/> 
          </Route>
          <Route exact path="/my/entries/:id">
            <Entry/>
          </Route>
          <Route exact path="/my/Settings">
            <Settings/>
          </Route>
           <Redirect exact path="/" to="/my/entries" />
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="home" href="/my/entries">
            <IonIcon icon={homeIcon}/>
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="Settings" href="/my/Settings">
          <IonIcon icon={settingsIcon}/>
            <IonLabel>Settings</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
   
)};

export default AppTabs;
