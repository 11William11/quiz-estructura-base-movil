import { Navigate, Route } from 'react-router-dom';
import {
  IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, setupIonicReact,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { personCircleOutline, pricetagOutline } from 'ionicons/icons';
import RegisterProductPage from './products/RegisterProductPage';
import RegisterUserPage from './users/RegisterUserPage';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import '../theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/users" element={<RegisterUserPage />} />
          <Route path="/products" element={<RegisterProductPage />} />
          <Route path="/" element={<Navigate to="/users" replace />} />
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="users" href="/users">
            <IonIcon icon={personCircleOutline} />
            <IonLabel>Usuarios</IonLabel>
          </IonTabButton>
          <IonTabButton tab="products" href="/products">
            <IonIcon icon={pricetagOutline} />
            <IonLabel>Productos</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
