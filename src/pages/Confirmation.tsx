import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/core';

import { Button } from '../components/Button';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface Params {
   title: string;
   subtitle: string;
   buttonTitle: string;
   icon: 'smile' | 'hug';
   nextScreen: string;
};

const emojis = {
   smile: '😄',
   hug: '🤗',
};


export function Confirmation() {
   const { navigate } = useNavigation();
   const routes = useRoute();

   const { title, subtitle, buttonTitle, icon, nextScreen } = routes.params as Params;

   function handleMoveOn() {
      navigate(nextScreen);
   };

   return (
      <SafeAreaView style={styles.container}>
         <View style={styles.content}>
            <Text style={styles.emoji}>
               {emojis[icon]}
            </Text>

            <Text style={styles.title}>{title}</Text>

            <Text style={styles.subtitle}>{subtitle}</Text>

            <View style={styles.footer}>
               <Button
                  onPress={handleMoveOn}
                  title={buttonTitle}
               />
            </View>
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

   content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      padding: 30,
   },

   emoji: {
      fontSize: 78,
   },

   title: {
      fontFamily: fonts.heading,
      fontSize: 22,
      lineHeight: 38,
      color: colors.heading,
      textAlign: 'center',
      marginTop: 15,
   },

   subtitle: {
      fontFamily: fonts.text,
      fontSize: 17,
      color: colors.heading,
      textAlign: 'center',
      paddingVertical: 10,
   },

   footer: {
      width: '100%',
      paddingHorizontal: 50,
      marginTop: 20,
   },
});
