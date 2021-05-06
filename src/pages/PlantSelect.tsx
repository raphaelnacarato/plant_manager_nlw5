import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/core';

import { Header } from '../components/Header';
import { EnviromentButton } from '../components/EnviromentButton';
import { PlantCardPrimary } from '../components/PlantCardPrimary';
import { Load } from '../components/Load';

import api from '../services/api';
import { PlantProps } from '../libs/storage';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface EnviromentProps {
   key: string;
   title: string;
}

export function PlantSelect() {
   const [loading, setLoading] = useState(true);

   const [page, setPage] = useState(1);
   const [loadingMore, setLoadingMore] = useState(true);

   const [environments, setEnvironments] = useState<EnviromentProps[]>([]);
   const [plants, setPlants] = useState<PlantProps[]>([]);
   const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([]);
   const [environmentSelected, setEnvironmentSelected] = useState('all');

   const { navigate } = useNavigation();


   useEffect(() => {
      async function fetchEnviroment() {
         const { data } = await api.get('plants_environments', {
            params: {
               _sort: 'title',
               _order: 'asc',
            }
         });

         setEnvironments([
            {
               key: 'all',
               title: 'Todos',
            },
            ...data
         ]);
      };

      fetchEnviroment();

   }, []);

   useEffect(() => {
      fetchPlants();

   }, []);

   async function fetchPlants() {
      const { data } = await api.get('plants', {
         params: {
            _sort: 'name',
            _order: 'asc',
            _page: page,
            _limit: 8,
         }
      });

      if (!data) return setLoading(true);

      if (page > 1) {
         setPlants(oldValue => [...oldValue, ...data]);
         setFilteredPlants(oldValue => [...oldValue, ...data]);

      } else {
         setPlants(data);
         setFilteredPlants(data);
      }

      setLoading(false);
      setLoadingMore(false);
   };

   function handleEnviromentSelected(environment: string) {
      setEnvironmentSelected(environment);

      if (environment === 'all') {
         return setFilteredPlants(plants)
      }

      const filtered = plants.filter(plant => plant.environments.includes(environment));

      setFilteredPlants(filtered);
   };

   function handleFetchMore(distance: number) {
      if (distance < 1) {
         return;
      }

      setLoadingMore(true);
      setPage(oldValue => oldValue + 1);
      fetchPlants();
   };

   function handlePlantSelect(plant: PlantProps) {
      navigate('PlantSave', { plant });
   };


   if (loading) {
      return <Load />
   }

   return (
      <View style={styles.container}>
         <View style={styles.header}>
            <Header />

            <Text style={styles.title}>Em qual ambiente</Text>
            <Text style={styles.subtitle}>você quer colocar sua planta?</Text>

         </View>

         <View>
            <FlatList
               data={environments}
               keyExtractor={item => String(item.key)}
               renderItem={({ item }) => (
                  <EnviromentButton
                     title={item.title}
                     active={item.key === environmentSelected}
                     onPress={() => handleEnviromentSelected(item.key)}
                  />
               )}
               horizontal
               showsHorizontalScrollIndicator={false}
               contentContainerStyle={styles.enviromentList}
            />
         </View>

         <View style={styles.plantsContainer}>
            <FlatList
               data={filteredPlants}
               keyExtractor={item => String(item.id)}
               renderItem={({ item }) => (
                  <PlantCardPrimary
                     data={item}
                     onPress={() => handlePlantSelect(item)}
                  />
               )}
               showsVerticalScrollIndicator={false}
               numColumns={2}
               onEndReachedThreshold={0.1}
               onEndReached={({ distanceFromEnd }) => handleFetchMore(distanceFromEnd)}
               ListFooterComponent={
                  loadingMore ?
                     <ActivityIndicator color={colors.green} />
                     :
                     <></>
               }
            />
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: colors.background,
   },

   header: {
      paddingHorizontal: 30,
   },

   title: {
      fontFamily: fonts.heading,
      fontSize: 17,
      lineHeight: 20,
      color: colors.heading,
      marginTop: 15,
   },

   subtitle: {
      fontFamily: fonts.text,
      fontSize: 17,
      lineHeight: 20,
      color: colors.heading,
   },

   enviromentList: {
      height: 40,
      justifyContent: 'center',
      paddingBottom: 5,
      marginLeft: 32,
      marginVertical: 32,
      paddingRight: 50,
   },

   plantsContainer: {
      flex: 1,
      paddingHorizontal: 32,
      justifyContent: 'center',
      paddingBottom: 30,
   },

});
