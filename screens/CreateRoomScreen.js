import React, { useContext } from 'react';
import { AuthenticatedUserContext } from '../providers';
import {
    StyleSheet,
    View,
    ScrollView
} from 'react-native';
import {
    Text,
} from 'react-native-paper';


export const CreateRoomScreen = () => {

    const { user } = useContext(AuthenticatedUserContext);

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainerStyle}
        >
            <View>
                <Text>
                    Hi
                </Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 12
    },
    contentContainerStyle: {
        padding: 24
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#afafaf',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginVertical: 20,
        fontSize: 20,
    },
    todoItem: {
        flexDirection: 'row',
        marginVertical: 10,
        alignItems: 'center'
    },
    todoText: {
        paddingHorizontal: 5,
        fontSize: 16
    },
});