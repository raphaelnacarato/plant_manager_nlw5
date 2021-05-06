import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import userImg from '../assets/avatarRaphael.png';
import colors from '../styles/colors';
import fonts from '../styles/fonts';


export function Header() {
   const [userName, setUserName] = useState<string>('');

   const { navigate } = useNavigation();

   useEffect(() => {
      async function loadStorageUserName() {
         const user = await AsyncStorage.getItem('@plantmanager:user');

         setUserName(user || '');
      }

      loadStorageUserName();

   }, []);

   async function removeUser() {
      await AsyncStorage.removeItem('@plantmanager:user');

      navigate('Welcome');
   };

   return (
      <View style={styles.container}>
         <View>
            <Text style={styles.greeting}>Olá!</Text>
            <Text style={styles.userName}>{userName}</Text>
         </View>

         <TouchableOpacity onPress={removeUser} activeOpacity={0.9}>
            <Image source={userImg} style={styles.image} />
         </TouchableOpacity>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 20,
      marginTop: getStatusBarHeight(),
   },

   greeting: {
      fontFamily: fonts.text,
      fontSize: 32,
      color: colors.heading,
   },

   userName: {
      fontFamily: fonts.heading,
      fontSize: 32,
      lineHeight: 40,
      color: colors.heading,
   },

   image: {
      width: 70,
      height: 70,
      borderRadius: 35,
   },
});
