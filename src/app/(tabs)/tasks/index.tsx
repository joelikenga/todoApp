import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Tasks = () => {
  return (
    <SafeAreaView edges={["top","bottom"]}>
    <View>
      <Text >Tasks</Text>
    </View>
    </SafeAreaView>
  )
}

export default Tasks

const styles = StyleSheet.create({})