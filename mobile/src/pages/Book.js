import React, { useState } from 'react';
import { AsyncStorage, Alert, View, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';

import api from '../services/api';

export default function Book( {navigation }) {
    const id = navigation.getParam('id');
    const [date, setDate] = useState('')

    async function handleSubmit() {
        const user_id = await AsyncStorage.getItem('user');

        try {
            await api.post(`/spots/${id}/bookings`, {
                date
            }, {
                headers: { user_id }
            });
    
            Alert.alert('Solicitação de reserva enviada.');

            navigation.navigate('List');
        } catch(e) {
            console.log(e)
        }
        
    }
    
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.label}>Data de interesse *</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="Qual data você quer reservar?"
                    placeholderTextColor="#999"
                    keyboardType="email-address"
                    autoCapitalize="words"
                    autoCorrect={false}
                    value={date}
                    onChangeText={setDate}
                />
                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                    <Text>Reservar</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleSubmit} style={[styles.button, styles.cancelButton]}>
                    <Text>Cancelar</Text>
                </TouchableOpacity>
            </View>

            
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30
    },

    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8
    },

    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius:2
    },

    button: {
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        marginBottom: 10
    },

    cancelButton: {
        backgroundColor: '#ccc',
    },

    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16
    }

});