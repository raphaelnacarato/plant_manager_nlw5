import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, Alert } from 'react-native';
import { formatDistance } from 'date-fns';
import { pt } from 'date-fns/locale';

import { Header } from '../components/Header';
import { PlantCardSecondary } from '../components/PlantCardSecondary';
import { Load } from '../components/Load';

import { loadPlants, PlantProps, removePlant } from '../libs/storage';
import waterDropImage from '../assets/waterdrop.png';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function MyPlants() {
   const [myPlants, setMyPlants] = useState<PlantProps[]>([]);
   const [loading, setLoading] = useState(true);
   const [nextWaterd, setNextWaterd] = useState<string>('');


   useEffect(() => {
      async function loadStorageData() {
         const plantsStoraged = await loadPlants();

         if (Object.keys(plantsStoraged).length !== 0) {
            const nextTime = formatDistance(
               new Date(plantsStoraged[0].dateTimeNotification).getTime(),
               new Date().getTime(),
               { locale: pt }
            );

            setNextWaterd(`Não esqueça de regar a ${plantsStoraged[0].name} ${nextTime}.`);
         }

         setMyPlants(plantsStoraged);

         setLoading(false);
      };

      loadStorageData();
   }, []);

   function handleRemove(plant: PlantProps) {
      Alert.alert('Remover', `Deseja remover a ${plant.name}?`, [
         {
            text: 'Não 🙏🏻',
            style: 'cancel'
         },
         {
            text: 'Sim 😥',
            onPress: async () => {
               try {
                  await removePlant(plant.id)

                  setMyPlants((oldData) => oldData.filter((item) => item.id !== plant.id));

               } catch (e) {
                  Alert.alert('Não foi possível remover! 😥')
               }
            }
         },
      ]);
   };


   if (loading) {
      return <Load />
   }

   return (
      <View style={styles.container}>
         <Header />

         <View style={styles.spotlight}>
            <Image source={waterDropImage} style={styles.spotlightImage} />

            {myPlants.length === 0 ? (
               <Text style={styles.spotlightText}>Adicione novas plantas verificar as suas informações</Text>
            ) : (
               <Text style={styles.spotlightText}>{nextWaterd}</Text>
            )}
         </View>

         <View style={styles.plants}>
            <Text style={styles.plantsTitle}>Próximas regadas</Text>

            {myPlants.length === 0 ? (
               <Text style={styles.noPlants}>Adicione novas plantas para serem regadas</Text>
            ) : (
               <FlatList
                  data={myPlants}
                  keyExtractor={item => String(item.id)}
                  renderItem={({ item }) => (
                     <PlantCardSecondary
                        data={item}
                        handleRemove={() => handleRemove(item)}
                     />
                  )}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ paddingBottom: 25 }}
               />
            )}

         </View>
      </View >
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 30,
      backgroundColor: colors.background,
   },

   spotlight: {
      backgroundColor: colors.blue_light,
      paddingHorizontal: 20,
      borderRadius: 20,
      height: 110,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
   },

   spotlightImage: {
      width: 60,
      height: 60,
   },

   spotlightText: {
      flex: 1,
      color: colors.blue,
      paddingHorizontal: 20,
      textAlign: 'center',
   },

   plants: {
      flex: 1,
      width: '100%',
   },

   noPlants: {
      fontFamily: fonts.text,
      fontSize: 16,
      textAlign: 'center',
      color: colors.green_dark,
      marginVertical: 20,
   },

   plantsTitle: {
      fontFamily: fonts.heading,
      fontSize: 24,
      color: colors.heading,
      marginVertical: 20,
   },
});
