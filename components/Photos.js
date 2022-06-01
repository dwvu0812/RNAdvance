import {StyleSheet, Text, View, FlatList, TouchableOpacity, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import APIService from '../Networking/API';

export default function UserDetail({navigation, route}) {
    const id = route.params?.id;
    const title = route.params?.title;
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    APIService.getPhotos(id).then(response => {
        setPhotos(response);
    });
    
  },[]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.textBack}
        onPress={() => navigation.goBack()}
        >Back</Text>
        <Text style={styles.textProfile}>Photos</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.username}>{title}</Text>
      </View>
      <View style={styles.itemContainer}>
        {/* <Text style={{fontSize: 16, color: '#000'}}>Todos List</Text> */}
        <FlatList 
            data={photos}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => {
                return (
                    <View style={styles.item}>
                        <Text>{item.id}</Text>
                        <Text>{item.title}</Text>
                        
                        <Image source={{uri:`${item.thumbnailUrl}`}} style={{width: 50, height: 50}}/>
                    </View>
                );
            }}
        />
      </View>
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    // marginLeft: 20,
  },
  header: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'flex-start',
    backgroundColor: '#5DB075',
    // height: 150,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  textBack: {
    color: '#fff',
  },
  textProfile: {
    color: '#fff',
    marginLeft: 120,
    fontSize: 20,
    fontWeight: '700',
  },
  info: {
    alignItems: 'center',
  },

  username: {
    marginTop: 20,
    // marginBottom: 20,
  },
  itemContainer: {
      marginLeft: 20,
      flex: 1,
      marginBottom: 10,
  },

});
