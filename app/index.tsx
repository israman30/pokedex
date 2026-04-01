import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

interface Pokemon {
  name: string;
  image: string;
  imageBack: string;
  types: PokemonType[];
}

interface PokemonType {
  type: {
    name: string;
    url: string;
  }
}

export default function Index() {

  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  console.log(JSON.stringify(pokemons[0], null, 2))

  useEffect(() => {
    // fetch pokemons
    fetchPokemon();
  }, [])

  async function fetchPokemon() {
    try {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=20&offset=20");
      const data = await response.json();

      // Fetching detail info of eahc pokemon in parallel
      const detailedPokemons = await Promise.all(
        data.results.map(async (pokemon: any) => {
          const res = await fetch(pokemon.url);
          const details = await res.json();
          return {
            name: pokemon.name,
            image: details.sprites.front_default, // main sprite
            imageBack: details.sprites.imageBack,
            types: details.types
          }
        })
      );

      // console.log(data.results)
      // console.log(detailedPokemons);
      setPokemons(detailedPokemons);
    } catch(e) {
      console.log(e)
    }
  }

  return (
    <ScrollView>
      { pokemons.map((pokemon) => (
        <View key={pokemon.name}>
          <Text style={styles.name}>{pokemon.name}</Text>
          <Text style={styles.type}>{pokemon.types[0].type.name}</Text>
          <View style= {{
            flexDirection: "row",
          }}>
            <Image
              source={{ uri: pokemon.image }}
              style={{ width: 150, height: 150 }}
            />
            <Image
              source={{ uri: pokemon.imageBack }}
              style={{ width: 100, height: 100 }}
            />
          </View>
        </View>
      )) }
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  name: {
    fontSize: 28,
    fontWeight: "bold"
  },
  type: {
    fontSize: 20,
    fontWeight: "bold",
    color: "gray"
  }
})