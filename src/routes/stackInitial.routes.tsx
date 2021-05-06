import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AuthRoutes from './tab.routes';

import { Welcome } from '../pages/Welcome';
import { UserIdentification } from '../pages/UserIdentification';
import { Confirmation } from '../pages/Confirmation';
import { PlantSave } from '../pages/PlantSave';

import colors from '../styles/colors';

const { Navigator, Screen } = createStackNavigator();


const StackInitialRoutes: React.FC = () => (
   <Navigator
      initialRouteName='Welcome'
      headerMode='none'
      screenOptions={{
         cardStyle: {
            backgroundColor: colors.white
         },
      }}
   >
      <Screen name='Welcome' component={Welcome} />
      <Screen name='UserIdentification' component={UserIdentification} />
      <Screen name='Confirmation' component={Confirmation} />
      <Screen name='PlantSelect' component={AuthRoutes} />
      <Screen name='PlantSave' component={PlantSave} />
      <Screen name='MyPlants' component={AuthRoutes} />
   </Navigator>
);

export default StackInitialRoutes;
