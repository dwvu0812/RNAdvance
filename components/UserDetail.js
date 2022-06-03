import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import APIService from '../Networking/API';

const windowWidth = Dimensions.get('window').width;

export default function UserDetail({navigation, route}) {
  const id = route.params?.id;
  const username = route.params?.username;
  const name = route.params?.name;

  const [active, setActive] = useState(true);

  const [loading, setLoading] = useState(false);

  const [todos, setTodos] = useState([]);
  const [albums, setAlbumns] = useState([]);

  const fetchTodos = () => {
    setLoading(true);
    APIService.getUserTodos(id)
      .then(response => {
        setTodos(response);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchAlbums = () => {
    setLoading(true);
    APIService.getUserAlbums(id)
      .then(response => {
        setAlbumns(response);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.textBack} onPress={() => navigation.goBack()}>
          Back
        </Text>
        <Text style={styles.textProfile}>Profile</Text>
      </View>
      <View style={styles.info}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: 150,
            height: 150,
            borderRadius: 150,
            backgroundColor: '#ccc',
            borderColor: '#fff',
            borderWidth: 2,
            position: 'absolute',
            top: -75,
          }}>
          <Text style={{color: '#fff', fontSize: 100, fontWeight: '700'}}>
            {username[0]}
          </Text>
        </View>
        <Text style={styles.username}>{username}</Text>
        <Text style={{fontWeight: '500', color: '#000', fontSize: 16}}>
          {name}
        </Text>
      </View>
      <View style={styles.btnGroup}>
        <TouchableOpacity
          style={active ? styles.btnActive : styles.btnDisabled}
          onPress={() => setActive(!active)}>
          <Text style={{fontSize: 20, fontWeight: '500'}}>Todos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={!active ? styles.btnActive : styles.btnDisabled}
          onPress={() => setActive(!active)}>
          <Text style={{fontSize: 20, fontWeight: '500'}}>Albums</Text>
        </TouchableOpacity>
      </View>

      {active && (
        <View style={styles.itemContainer}>
          <FlatList
            refreshing={loading}
            onRefresh={fetchTodos}
            data={todos}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => {
              return (
                <View style={styles.item}>
                  {/* <Text>{item.id}</Text> */}
                  <Text
                    numberOfLines={1}
                    style={
                      item.completed
                        ? styles.todoCompleted
                        : styles.todoInCompleted
                    }>
                    {item.id + '. ' + item.title}
                  </Text>
                </View>
              );
            }}
          />
        </View>
      )}
      {!active && (
        <View style={styles.itemContainer}>
          <FlatList
            refreshing={loading}
            onRefresh={fetchAlbums}
            numColumns={2}
            horizontal={false}
            data={albums}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  style={{
                    alignItems: 'center',
                    width: (windowWidth - 60) / 2,
                    height: 150,
                    backgroundColor: '#F6F6F6',
                    alignItems: 'center',
                    padding: 5,
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 10,
                    marginLeft: 10,
                    marginBottom: 10,
                  }}
                  onPress={() => navigation.navigate('Photos', {id: item.id})}>
                  <View
                    style={{
                      backgroundColor: '#F6F6F6',
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 50,
                        fontWeight: '700',
                        color: '#5DB075',
                      }}>
                      {item.title[0].toUpperCase()}
                    </Text>
                  </View>
                  <Text numberOfLines={1} style={styles.todoInCompleted}>
                    {item.id + '. ' + item.title}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      )}
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
    height: 150,
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
    position: 'relative',
  },

  username: {
    marginTop: 80,
    // marginBottom: 20,
    fontSize: 30,
    fontWeight: '700',
    color: '#000',
  },
  itemContainer: {
    marginLeft: 15,
    flex: 1,
    marginBottom: 10,
    width: windowWidth - 30,
  },
  btnGroup: {
    flexDirection: 'row',
    height: 50,
    width: windowWidth - 40,
    borderRadius: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 20,
    marginVertical: 10,
    backgroundColor: '#F6F6F6',
  },
  btnActive: {
    width: (windowWidth - 40) / 2,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    height: 50,
    borderColor: '#5DB075',
    borderWidth: 1,
  },
  btnDisabled: {
    width: (windowWidth - 40) / 2,
    backgroundColor: '#F6F6F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  todoCompleted: {
    fontSize: 16,
    color: 'red',
    textDecorationLine: 'line-through',
    marginBottom: 10,
  },
  todoInCompleted: {
    fontSize: 16,
    color: '#000',
    marginBottom: 10,
  },
});
