import React from 'react';
import { SafeAreaView, View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { Feather } from '@expo/vector-icons';

import wateringImg from '../assets/watering.png';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function Welcome() {
   const { navigate } = useNavigation();

   function handleStart() {
      navigate('UserIdentification');
   };

   return (
      <SafeAreaView style={styles.container}>

         <View style={styles.wrapper}>
            <Text style={styles.title}>
               Gerencie {'\n'}
            suas plantas de {'\n'}
            forma fácil
         </Text>

            <Image
               source={wateringImg}
               style={styles.image}
               resizeMode='contain'
            />

            <Text style={styles.subtitle}>Não esqueça mais de regar suas plantas. Nós cuidamos de lembrar sempre que precisar.</Text>

            <TouchableOpacity
               onPress={handleStart}
               style={styles.button}
               activeOpacity={0.7}
            >
               <Feather name='chevron-right' style={styles.buttonIcon} />
            </TouchableOpacity>
         </View>

      </SafeAreaView>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-around',
   },

   wrapper: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-around',
      paddingHorizontal: 20,
   },

   title: {
      fontFamily: fonts.heading,
      fontSize: 28,
      lineHeight: 34,
      textAlign: 'center',
      color: colors.heading,
      marginTop: 38,
   },

   image: {
      height: Dimensions.get('window').width * 0.7,
   },

   subtitle: {
      fontFamily: fonts.text,
      fontSize: 18,
      textAlign: 'center',
      paddingHorizontal: 20,
      color: colors.heading,
   },

   button: {
      width: 56,
      height: 56,
      backgroundColor: colors.green,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 16,
      marginBottom: 10,
   },

   buttonIcon: {
      fontSize: 32,
      color: colors.white,
   },

});
