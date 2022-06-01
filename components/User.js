import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import APIService from '../Networking/API';

export default function User({navigation}) {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    APIService.getUsers().then(response => {
      setUsers(response);
    });
  }, []);
  return (
    <View>
      <Text style={styles.text}>User List</Text>
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
                })
              }>
              <Text style={styles.itemId}>{item.id}</Text>
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
    fontSize: 30,
    color: '#000',
    fontWeight: '700',
    marginVertical: 20,
  },
  itemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    alignItems: 'flex-start',
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
