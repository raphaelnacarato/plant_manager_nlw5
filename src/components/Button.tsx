import React from 'react';
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps } from 'react-native';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface ButtonProps extends TouchableOpacityProps {
   title: string;
}

export function Button({ title, ...rest }: ButtonProps) {
   return (
      <TouchableOpacity
         style={styles.button}
         {...rest}
      >
         <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
   );
};

const styles = StyleSheet.create({
   button: {
      backgroundColor: colors.green,
      height: 56,
      borderRadius: 16,
      alignItems: 'center',
      justifyContent: 'center',
   },

   buttonText: {
      fontFamily: fonts.heading,
      fontSize: 16,
      color: colors.white,
   },
})