import { Link } from "expo-router";
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

const colorsByType = {
  // Original & Primary Types
  grass: "#48D0B0",    // Mint Green
  fire: "#FB6C6C",     // Soft Red/Orange
  water: "#76BDFE",    // Sky Blue
  bug: "#A8B820",      // Olive Green
  
  // Expanded Types
  electric: "#FFD86E", // Bright Yellow
  psychic: "#F85888",  // Pink
  ice: "#98D8D8",      // Cyan
  dragon: "#7038F8",   // Deep Purple
  ghost: "#705898",    // Indigo
  poison: "#A040A0",   // Purple
  ground: "#E0C068",   // Sandy Brown
  rock: "#B8A038",     // Rock Grey
  flying: "#A890F0",   // Lavender
  fighting: "#C03028", // Deep Red
  normal: "#A8A878",   // Sage
  steel: "#B8B8D0",    // Metallic Blue
  fairy: "#EE99AC",    // Rose
  dark: "#705848"      // Espresso
};

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
            imageBack: details.sprites.back_default,
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
    <ScrollView contentContainerStyle={{
      gap: 16,
      padding: 16
    }}>
      { pokemons.map((pokemon) => (
        <Link key={pokemon.name}
          href={{ pathname: "/detail", params: { name: pokemon.name } }}
           style={{
            // @ts-ignore
            backgroundColor: colorsByType[pokemon.types[0].type.name] + 50,
            padding: 20,
            borderRadius: 20
          }}
        >
          <View>
            <Text style={styles.name}>{pokemon.name}</Text>
            <Text style={styles.type}>{pokemon.types[0].type.name}</Text>
            <View style={{
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
        </Link>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  name: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center"
  },
  type: {
    fontSize: 20,
    fontWeight: "bold",
    color: "gray",
    textAlign: "center"
  }
})