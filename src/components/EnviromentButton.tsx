import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface EnviromentButtonProps extends RectButtonProps {
   title: string;
   active?: boolean;
}

export const EnviromentButton = ({ title, active = false, ...rest }: EnviromentButtonProps) => {
   return (
      <RectButton
         style={[styles.button, active && styles.buttonActive]}
         {...rest}
      >
         <Text style={[styles.buttonText, active && styles.buttonTextActive]}>{title}</Text>
      </RectButton>
   );
};

const styles = StyleSheet.create({
   button: {
      backgroundColor: colors.shape,
      width: 76,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 12,
      marginHorizontal: 5,
   },

   buttonActive: {
      backgroundColor: colors.green_light,
   },

   buttonText: {
      color: colors.heading,
      fontFamily: fonts.text,
   },

   buttonTextActive: {
      color: colors.green_dark,
      fontFamily: fonts.heading,
   }
});
