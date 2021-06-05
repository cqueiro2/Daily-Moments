import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { IonApp, IonLoading } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

import AppTabs from "./AppTabs";
import { AuthContext, useAuthInit } from "./auth";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";



const App: React.FC = () => { 
  const {loading, auth} = useAuthInit(); 
  console.log(`logged in status: `, auth)
  if(loading){
    return <IonLoading isOpen/>
  }
  console.log(`rendering App with auth:`, auth);
  return (
    <>
    <IonApp>
    <AuthContext.Provider value={auth? auth : { loggedIn: false}}>
        <IonReactRouter>
          <Switch>
            <Route exact path="/login">
              <Login/>
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
            <Route path="/my">
              <AppTabs />
            </Route>
            <Redirect exact path="/" to="/my/entries" />
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </IonReactRouter>
      </AuthContext.Provider>
    </IonApp>
    </>
  );
};

export default App;
