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

export const CreateScreen = ({ navigation }) => {
    const [errorState, setErrorState] = useState('');
    const { user } = useContext(AuthenticatedUserContext);
    const db = getFirestore();

    const handleSignup = async values => {
        const { roomId } = values;
        console.log(roomId)

        const docRef = doc(db, "sessions", roomId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("RoomID taken.", docSnap.data());
            setErrorState(`${roomId} is already taken.`)
        } else {
            // doc.data() will be undefined in this case
            console.log("RoomID is valid.");
            console.log(user.email);
            setErrorState('')
            //TODO uncomment this
            await setDoc(docRef, { owner: user.email }, { merge: true });
            navigation.navigate('Activity', { roomId });
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
                                label="Enter room name"
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
                                Create
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