// TODO logout
// Profile 

import React from 'react';
import { View, ScrollView } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { signOut } from 'firebase/auth';
import { auth } from '../config';

export const SettingsScreen = () => {

    const handleLogout = () => {
        signOut(auth).catch(error => console.log('Error logging out: ', error));
    };

    return (
        <ScrollView>
            <View>
                <Text variant="displayLarge">
                    Settings
                </Text>
            </View>
            <View >
                <Button mode="outlined" onPress={handleLogout} >
                    Sign Out
                </Button>
            </View>
        </ScrollView>
    );
}

