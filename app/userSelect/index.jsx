import { SafeAreaView, Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { IconSymbol } from '@/components/ui/IconSymbol';
import { router } from "expo-router";

const UserScreen = () => {
  return (
    <SafeAreaView style={styles.background}>
      <View>
        <Text style={styles.watchText}>Who&apos;s watching?</Text>
        <View style={styles.userContainer}>
          <TouchableOpacity style={{alignItems: 'center', gap: 10}} onPress={() => router.push('/home')}>
            <Image source={require('../../assets/images/user1.png')} style={styles.userImage} />
            <Text style={styles.text}>Temitope</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{alignItems: 'center', gap: 10}} onPress={() => router.push('/home')}>
            <Image source={require('../../assets/images/user2.png')} style={styles.userImage} />
            <Text style={styles.text}>John</Text>
          </TouchableOpacity>
        </View>
          <TouchableOpacity style={{alignItems: 'center', gap: 10, marginTop: 30, width: 'fit-content'}} onPress={() => router.push('/home')}>
            <View style={{borderWidth: 1, borderColor: '#ffffff60', padding: 10, borderRadius: 10}}>
            <IconSymbol type="ion" size={50} name="add" color="#fff" /></View>
          </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default UserScreen
const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: 50,
  },
  watchText: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'SFProDisplayBold',
    textAlign: 'center',
    color: '#fff',
    marginBottom: 30,
  },
  text: {
    color: '#fff',
    fontFamily: 'SFProDisplayMedium',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  userContainer: {
    gap: 20,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
  },
  userImage:{
    width: 150,
    height: 150,
    borderRadius: 10,
    borderColor: '#6ebeffaf',
    borderWidth: 1,
  },
});