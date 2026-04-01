import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { ScrollView, StyleSheet } from "react-native";

export default function Details() {

  const parmas = useLocalSearchParams()

  console.log(parmas)

  useEffect(() => {

  }, [])

  async function fetchPokemonByName(name: string) {
    try {
      // const res = try fetch()
    } catch(e) {
      console.log(e)
    }
  }

  return (
    <ScrollView contentContainerStyle={{
      gap: 16,
      padding: 16
    }}>
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({ })