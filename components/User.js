import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import APIService from '../Networking/API';
import Ionicons from 'react-native-vector-icons/Ionicons';


export default function User({navigation}) {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    APIService.getUsers().then(response => {
      setUsers(response);
    });
  }, []);
  return (
    <View style={{flex: 1}}>
      <View style={{backgroundColor: '#5DB075'}}>
      <Text style={styles.text}>User List</Text>

      </View>

      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={users}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={styles.itemContainer}
              onPress={() =>
                navigation.navigate('UserDetail', {
                  id: item.id,
                  username: item.username,
                  name: item.name,
                })
              }>
              
              <View style={{backgroundColor: '#F6F6F6', width: 50, height: 50, borderRadius: 10,
              alignItems: 'center', justifyContent: 'center', marginRight: 10}}>
     
                <Ionicons name="ios-person" size={30} color="#5DB075" />
              </View>
              <View style={styles.itemText}>
                <Text style={styles.username}>{item.username}</Text>
                <Text style={styles.name}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  text: {
    textAlign: 'center',
    fontSize: 25,
    color: '#fff',
    fontWeight: '700',
    marginVertical: 10,
  },
  itemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  itemId: {
    width: 40,
    //   backgroundColor: 'red',
    borderRadius: 20,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#000',
    fontSize: 20,
  },
  username: {
    fontSize: 20,
    color: '#000',
    fontWeight: '500',
  },
  name: {
    color: '#000',
  },
  itemText: {
    marginBottom: 10,
  },
});
