import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function componentName({ handleSubmit, btnTitle, loading }) {
    return (
        <TouchableOpacity
            style={styles.submitBtn}
            onPress={() => handleSubmit()}
        >
            <Text style={styles.buttonTitle}>
                {
                    loading ? "Loading..." : btnTitle
                }
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    submitBtn: {
        backgroundColor: '#0e3654',
        alignSelf: 'center',
        borderRadius: 20,
        justifyContent: 'center',
        marginVertical: 10,
        elevation: 10,
    },
    buttonTitle: {
        color: '#ffffff',
        textAlign: 'center',
        fontSize: 20,
        paddingVertical: 8,
        paddingHorizontal: 50,
        fontWeight: "400",
    },
})
