import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native';
import React, {useState, useEffect} from 'react';
import APIService from '../Networking/API';
import { color } from '@rneui/base';

const windowWidth = Dimensions.get('window').width;

export default function UserDetail({navigation, route}) {
  const id = route.params?.id;
  const title = route.params?.title;
  const [photos, setPhotos] = useState([]);

  const [loading, setLoading] = useState(false);

  const fetch = () => {
    setLoading(true);
    APIService.getPhotos(id).then(response => {
      setPhotos(response)
    }).finally(() => setLoading(false));
  }

  useEffect(() => {
    fetch();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.textBack} onPress={() => navigation.goBack()}>
          Back
        </Text>
        <Text style={styles.textProfile}>{'Album ' + id}</Text>
      </View>

      <View style={styles.itemContainer}>
        {/* <Text style={{fontSize: 16, color: '#000'}}>Todos List</Text> */}
        <FlatList
          refreshing={loading}
          onRefresh={fetch}
          data={photos}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => {
            return (
              <View style={styles.item}>
                <View style={{flexDirection: 'row',
                
                }}>
                  <Image
                    source={{uri: `${item.thumbnailUrl}`}}
                    style={{width: 50, height: 50, borderRadius: 10, marginBottom: 10,}}
                  />
                  <Text style={{
                    fontSize: 16,
                    color: '#000',
                    marginHorizontal: 10,
                    width: windowWidth - 120,
                  }}>{item.title}</Text>
                </View>
                <Image
                  source={{uri: `${item.url}`}}
                  style={{width: '100%', height: 200, borderRadius: 10}}
                />
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
    alignItems: 'center',
    backgroundColor: '#5DB075',
  },
  textBack: {
    color: '#fff',
  },
  textProfile: {
    color: '#fff',
    marginLeft: 110,
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
    width: windowWidth - 40,

  },
  item: {
    marginTop: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  }
});
