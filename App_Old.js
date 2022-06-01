import { StyleSheet, Text, View, FlatList } from 'react-native';
import React, {useEffect, useState} from 'react';
import PokemonItem from './components/PokemonItem';

export default function App() {
  const [allPokemons, setAllPokemons] = useState([]);
  const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon?limit=20');

  const getAllPokemons = async () => {
    const res = await fetch(loadMore);
    const data = await res.json();
    // console.log(data.sprites.other.dream_world.front_default)
    setLoadMore(data.next);

    function createPokemonObject(results) {
      results.forEach( async pokemon => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
        const data = await res.json();
        setAllPokemons(current => [...current, data]);
        allPokemons.sort((a, b) => a.id - b.id);
        
      })
    }
    createPokemonObject(data.results)
  }
  
  useEffect(() => {
    getAllPokemons();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pokemon</Text>

      <FlatList
        numColumns={2}
        horizontal={false}
        data={allPokemons}
        keyExtractor={item => item.id.toString()}
        renderItem={({item, index}) => {
          return (
           <PokemonItem 
             id={item.id}
             image={item.sprites.other.home.front_default}
             name={item.name}
           />
          )
        }}
        // style={{backgroundColor: 'red'}}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#000',
    fontSize: 30,
    fontWeight: '700',
  }
})