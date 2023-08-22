import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AddAddress } from '../../components'

interface Props{
   index?:number
}
const WorkingLocation: React.FC<Props> = ({index}) => {
  return (
    <View>
      <AddAddress index={index} />
    </View>
  )
}

export default WorkingLocation

const styles = StyleSheet.create({})