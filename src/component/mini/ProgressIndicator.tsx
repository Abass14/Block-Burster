import React from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import colors from '../../assests/colors/colors'

function ProgressIndicator() {
    return (
        <View>
            <ActivityIndicator size="large" color={colors.SUCCESS} />
        </View>
    )
}

const styles = StyleSheet.create({

})

export default ProgressIndicator
