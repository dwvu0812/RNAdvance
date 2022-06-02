import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
  TextInput,
} from 'react-native';
import APIService from '../Networking/API';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function PostComments({navigation, route}) {
  const {id} = route?.params;
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);

  useEffect(() => {
    APIService.getPostComments(id).then(response => {
      setComments(response);
    });
    APIService.getPostDetail(id).then(response => {
      setPost(response);
    });
  }, []);

  const renderItem = ({item}) => {
    return (
      <View style={styles.itemContainer}>
        <View
          style={{
            backgroundColor: 'lightblue',
            width: 50,
            height: 50,
            borderRadius: 25,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 10,
          }}>
          <Text style={{color: '#fff', fontSize: 18, fontWeight: '700'}}>
            {item.id}
          </Text>
        </View>
        <View
          style={{
            borderWidth: 1,
            borderColor: '#000',
            width: '80%',
            padding: 10,
            borderRadius: 10,
          }}>
          <Text style={{color: '#000', fontSize: 16, fontWeight: '700'}}>
            {item.name}
          </Text>
          <Text>{item.body}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.header}>
        <Text style={styles.textBack} onPress={() => navigation.goBack()}>
          Back
        </Text>
        <Text style={styles.textProfile}>Comments</Text>
      </View>

      <FlatList
        data={comments}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={() => {
          return (
            <TextInput
              placeholder="Type your comment here"
              style={{
                width: windowWidth - 40,
                backgroundColor: '#F0F0F0',
                elevation: 1,
                marginLeft: 20,
                marginTop: 20,
                marginVertical: 10,
                paddingLeft: 10,
                borderRadius: 10,
              }}
            />
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
    marginLeft: 100,
    fontSize: 20,
    fontWeight: '700',
  },
  itemContainer: {
    flexDirection: 'row',
    margin: 20,
  },
});
