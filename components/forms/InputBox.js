import { View, Text, StyleSheet, TextInput } from 'react-native'
import React from 'react'

const InputBox = ({
    value,
    setValue,
    inputTitle,
    secure = false,
    keyboardType,
    autoComplete,
    multiline = false,
    numberOfLines = 2,
    editable = true }) => {
    return (
        <View>
            <Text style={styles.inputTitle}> {inputTitle}</Text>
            <TextInput
                value={value}
                onChangeText={(text) => setValue(text)}
                placeholder={`Enter ${inputTitle}`}
                style={styles.inputBox}
                secureTextEntry={secure}
                autoCorrect={false}
                keyboardType={keyboardType}
                autoComplete={autoComplete}
                numberOfLines={numberOfLines}
                multiline={multiline}
                editable={editable}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    inputBox: {
        marginBottom: 15,
        backgroundColor: 'white',
        paddingLeft: 10,
        marginTop: 4,
        color: '#b78d4b',
        fontStyle: 'italic',
        marginHorizontal: 20,
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: 5,
        borderColor: '#2b72ac',
        elevation: 5,
    },
    inputTitle: {
        fontSize: 15,
        marginHorizontal: 30,

    }
})


export default InputBox

