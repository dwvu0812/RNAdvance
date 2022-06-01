import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';

export default function PokemonItem({id, image, name, type}) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>#0{id}</Text>
      <Image style={{
          width: 20,
          height: 20,
          backgroundColor: 'red',
      }} source={{uri: image}}/>
      <Text>{name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'red'
    },
    text: {
        color: '#000',

    }
})