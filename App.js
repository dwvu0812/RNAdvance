import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';
import APIService from './Networking/API';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import User from './components/User';
import UserDetail from './components/UserDetail';
import PostComments from './components/PostComments';
import Photos from './components/Photos';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {Button, ThemeProvider} from 'react-native-elements';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Tabbar() {
  return (
    <Tab.Navigator
      // screenOptions={{headerShown: false}}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Main') {
            iconName = focused ? 'menu' : 'menu-outline';
          } else if (route.name === 'User') {
            iconName = focused ? 'person' : 'person-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'green',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}>
      <Tab.Screen name="Main" component={Main} />
      <Tab.Screen name="User" component={User} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Tabbar" component={Tabbar} />
        <Stack.Screen name="UserDetail" component={UserDetail} />
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="PostComments" component={PostComments} />
        <Stack.Screen name="Photos" component={Photos} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


function Main({navigation}) {
  const [listPost, setListPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const [textSearch, setTextSearch] = useState('');

  useEffect(() => {
    fetch();
  }, []);

  const fetch = () => {
    setLoading(true);
    APIService.getPosts()
      .then(res => {
        setListPost(res);
      })
      .finally(() => setLoading(false));
  };

  const pressItem = id => {
    navigation.navigate('PostComments', {id: id});
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => pressItem(item.id)}
        style={styles.postItem}>
        <View style={styles.postItem_id}>
          <Text style={{color: '#fff', fontSize: 20}}>{item.id}</Text>
        </View>
        <View style={styles.postItem_content}>
          <Text style={styles.postItem_title} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.postItem_body} numberOfLines={2}>
            {item.body}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    if (textSearch) {
      const list = listPost.filter(item =>
        item.title.toLowerCase().includes(textSearch.toLowerCase())
      );
      console.log(textSearch)
      console.log(list)
      setListPost(list);
      // setTextSearch('');
    } else {
      setListPost([]);
    }
  }, [textSearch])
  // console.log(textSearch)

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={() => (
          <View>
            <Text style={styles.header}>Feed</Text>
            <TextInput
              placeholder="Search"
              style={styles.search}
              value={textSearch}
              onChangeText={setTextSearch}
            />
          </View>
        )}
        data={listPost}
        refreshing={loading}
        onRefresh={fetch}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginVertical: 10,
  },
  search: {
    width: windowWidth - 40,
    backgroundColor: '#F6F6F6',
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 10,
  },
  postItem: {
    flexDirection: 'row',
    width: windowWidth - 60,
    alignItems: 'center',
    // justifyContent: 'center',
    marginLeft: 20,
    marginBottom: 10,
  },
  postItem_id: {
    width: 50,
    height: 50,
    backgroundColor: '#5DB075',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  postItem_content: {
    marginLeft: 10,
    marginRight: 20,
    justifyContent: 'flex-start',
    width: windowWidth - 100,
  },
  postItem_title: {
    fontSize: 20,
    fontWeight: '500',
    color: '#000',
  },
  postItem_body: {
    fontSize: 15,
    color: '#000',
  },
});
