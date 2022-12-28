import React, { useContext, useState } from 'react';
import { AuthenticatedUserContext } from '../providers';
import {
    StyleSheet,
    View,
    ScrollView
} from 'react-native';
import {
    Text,
    TextInput,
    Button,
    HelperText
} from 'react-native-paper';
import { Formik } from 'formik';
import { setDoc, getDoc, doc, getFirestore } from "firebase/firestore";

export const JoinScreen = ({ navigation }) => {
    const [errorState, setErrorState] = useState('');
    const { user } = useContext(AuthenticatedUserContext);
    const db = getFirestore();

    const handleSignup = async values => {
        const { roomId } = values;
        console.log(roomId)

        const docRef = doc(db, "sessions", roomId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("RoomID to be joined.", docSnap.data());
            setErrorState('');
            navigation.navigate('Activity', { roomId });
        } else {
            console.log("RoomID invalid try again.");
            console.log(user.email);
            setErrorState(`${roomId} doesn't exist.`)
        }
    };

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainerStyle}
        >
            <View>
                <Formik
                    initialValues={{
                        roomId: ''
                    }}
                    onSubmit={values => handleSignup(values)}
                >
                    {({
                        values,
                        errors,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting
                    }) => (
                        <>
                            {/* 
                            TEXT IMPUT EXAMPLE
                            https://snack.expo.dev/@react-native-paper/react-native-paper-example_v5 */}
                            <TextInput
                                mode="outlined"
                                label="Enter room name to join"
                                theme={{ roundness: 0 }}
                                onChangeText={handleChange('roomId')}
                                onBlur={handleBlur('roomId')}
                                value={values.roomId}
                                error={errorState}
                            />
                            <HelperText type="error" padding="none" visible={!errors}>
                                {errorState}
                            </HelperText>
                            {errorState !== '' ? (
                                <Text>
                                    {errorState}
                                </Text>
                            ) : null}
                            <Button mode={'contained'} onPress={handleSubmit} disabled={isSubmitting}>
                                Join
                            </Button>
                        </>
                    )}
                </Formik>
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