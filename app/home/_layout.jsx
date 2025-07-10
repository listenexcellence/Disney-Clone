import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function HomeLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }} animation="slide_from_left">
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="movieDetails/[id]" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
