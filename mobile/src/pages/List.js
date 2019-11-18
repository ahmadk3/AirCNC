import React, {useState, useEffect} from 'react';
import { ScrollView, SafeAreaView, View, Text, AsyncStorage, Image, StyleSheet, Platform, TouchableOpacity} from 'react-native';

import SpotList from '../components/SpotList'

import logo from '../assets/logo.png';

export default function List({navigation}) {
    
    const [techs, setTechs] = useState([]);

    useEffect(() =>{
        AsyncStorage.getItem('techs').then(storageTechs => {
            const techsArray = storageTechs.split(',').map(tech => tech.trim());
            setTechs(techsArray);
            console.log('aaaaaaa')

            console.log(techsArray)
        });
    }, []);

    function handleLogoff() {
        AsyncStorage.removeItem('user')
        .then(() => {
            AsyncStorage.removeItem('techs')
        }).then(() => {
            navigation.navigate('Login');
        });
    }

    return (
        <SafeAreaView style={styles.container}>

            <TouchableOpacity onPress={handleLogoff} style={styles.button}>
                <Text>Log-off</Text>
            </TouchableOpacity>

            <Image source={logo} style={styles.logo}/>

            <ScrollView>
                {techs.map(tech => <SpotList key={tech} tech={tech}/>)}
            </ScrollView>
            
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 30 : 0
    },

    logo: {
        height: 32,
        resizeMode: "contain",
        alignSelf: 'center',
        marginTop: 10,
    }
});