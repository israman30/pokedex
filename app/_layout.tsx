import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack>
    <Stack.Screen 
      name="app"
      options={{ title: "Home" }}
    />
    <Stack.Screen
      name="detail"
      options={{
        title: "Details",
        headerBackButtonDisplayMode: "minimal"
      }}
    />
  </Stack>;
}
