import { ActivityIndicator, ImageBackground, StyleSheet, } from 'react-native'
import React, { useEffect } from 'react'
import { router } from "expo-router";

const Splash = () => {
    const handleLoad = async () => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 5000)); // Simulate loading
            router.replace('/userSelect'); // Navigate to user selection screen after loading
        } catch (error) {
            console.error("Error loading splash screen:", error);
        }
    };

    useEffect(() => {
        handleLoad();
    }, []);

    return (
        <ImageBackground
            source={require('../assets/images/back.png')}
            style={styles.background}
            resizeMode="cover" // or "contain", "stretch", "repeat", "center"
        >
      <ActivityIndicator size="large" color="#ffffffff" />
    </ImageBackground>
  )
}

export default Splash
const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: 50,
  },
  loadingContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    width: "80%",
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
});