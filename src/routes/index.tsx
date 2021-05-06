import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import StackRoutes from './stack.routes';
import StackInitialRoutes from './stackInitial.routes';

const Routes = () => {
   const [userName, setUserName] = useState<string>('');

   useEffect(() => {
      async function loadStorageUserName() {
         const user = await AsyncStorage.getItem('@plantmanager:user');

         setUserName(user || '');
      };

      loadStorageUserName();

   }, []);


   return (
      <NavigationContainer>
         {userName ? <StackRoutes /> : <StackInitialRoutes />}
      </NavigationContainer>

   );
};

export default Routes;
