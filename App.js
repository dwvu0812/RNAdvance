import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import APIService from './Networking/API';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import User from './components/User';
import UserDetail from './components/UserDetail';
import Photos from './components/Photos';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Tabbar() {
  return (
    <Tab.Navigator
        // screenOptions={{headerShown: false}}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Main') {
              iconName = focused
                ? 'menu'
                : 'menu-outline';
            } else if (route.name === 'User') {
              iconName = focused ? 'person' : 'person-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
    >
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
        <Stack.Screen name="Detail" component={Detail} />
        <Stack.Screen name="Photos" component={Photos} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function Detail({route}) {
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

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Text>PostId: {post.id}</Text>
      <Text>Title: {post.title}</Text>
      <Text>Body: {post.body}</Text>
      <Text style={{marginVertical: 10}}>Comment:</Text>
      <FlatList
        data={comments}
        renderItem={({item}) => (
          <View
            style={{
              borderBottomWidth: 1,
            }}>
            <Text>name: {item.name}</Text>
            <Text>email: {item.email}</Text>
            <Text>content: {item.body}</Text>
          </View>
        )}
      />
    </View>
  );
}

function Main({navigation}) {
  const [listPost, setListPost] = useState([]);
  const [loading, setLoading] = useState(false);
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
    navigation.navigate('Detail', {id: id});
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => pressItem(item.id)}
        style={{borderBottomWidth: 1, marginBottom: 10}}>
        <Text>ID: {item.id}</Text>
        <Text>Title: {item.title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <FlatList
        data={listPost}
        refreshing={loading}
        onRefresh={fetch}
        renderItem={renderItem}
      />
    </View>
  );
}
1;
