import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function Index() {

  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    // fetch pokemons
    fetchPokemon();
  }, [])

  async function fetchPokemon() {
    try {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=20&offset=20");
      const data = await response.json();
      // console.log(data)
      setPokemons(data);
    } catch(e) {
      console.log(e)
    }
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>First changes to commit.</Text>
    </View>
  );
}
