import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { SvgUri } from 'react-native-svg';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface PlantProps extends RectButtonProps {
   data: {
      name: string;
      photo: string;
   };
};

export const PlantCardPrimary = ({ data, ...rest }: PlantProps) => {
   return (
      <RectButton
         style={styles.button}
         {...rest}
      >
         <SvgUri
            uri={data.photo}
            width={70}
            height={70}
         />
         <Text style={styles.buttonText}>{data.name}</Text>
      </RectButton>
   );
};

const styles = StyleSheet.create({
   button: {
      flex: 1,
      maxWidth: '50%',
      backgroundColor: colors.shape,
      borderRadius: 20,
      paddingVertical: 10,
      alignItems: 'center',
      marginHorizontal: 5,
      marginVertical: 10,
   },

   buttonText: {
      fontFamily: fonts.heading,
      fontSize: 20,
      color: colors.green_dark,
      marginVertical: 16,
      textAlign: 'center',
   },
});
