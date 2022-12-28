import React, { useState, useEffect, useContext } from 'react';
import { AuthenticatedUserContext } from '../providers';
import { StyleSheet, ScrollView } from 'react-native';
import { View } from '../components';
import {
    Text,
    Checkbox,
    TextInput,
    Button
} from 'react-native-paper';

import { doc, arrayUnion, updateDoc, getDoc, getFirestore, serverTimestamp, deleteField } from "firebase/firestore";

export const ActivityScreen = ({ route, navigation }) => {

    const [ideas, setIdeas] = useState([]);
    const [presentIdea, setPresentIdea] = useState('');
    let ideasKeys = Object.keys(ideas);
    const { user } = useContext(AuthenticatedUserContext);
    const [owner, setOwner] = useState('');
    const { roomId } = route.params;
    const db = getFirestore();
    const docRef = doc(db, "sessions", roomId);

    useEffect(() => {
        return (async () => {
            const docSnap = await getDoc(docRef);
            const document = docSnap.data();
            setOwner(document.owner === user.email);
            console.log('is owner', owner.toString())
            let docIdeas = document?.ideas ?? [];
            docIdeas = docIdeas.filter(idea => idea.user === user.uid);
            console.log('ideas', docIdeas)
            setIdeas(docIdeas);
            return document
        })
    }, []);

    async function addNewIdea() {
        console.log('addNewIdea', presentIdea);
        const model = {
            user: user.uid,
            text: presentIdea,
        }
        await updateDoc(docRef, { ideas: arrayUnion({ ...model }) });
        console.log('addNewIdea', [{ ...ideas, ...model }])
        setIdeas([...ideas, { ...model }]);
        setPresentIdea('');
    }

    async function clearTodos() {
        //TODO clear only where user matches UID of logged in user
        const data = await updateDoc(docRef, {
            [`ideas.${user.uid}`]: deleteField()
        });
        console.log('clearTodos', data)
    }

    return <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainerStyle}
    >
        <View>
            {owner && <>
                <Text>Admin</Text>
                <Button mode='outlined'>
                    Stop
                </Button>
            </>}
        </View>

        <View>
            {ideas.length > 0 ? (
                ideasKeys.map(key => (
                    // <ToDoItem
                    //     key={key}
                    //     id={key}
                    //     todoItem={todos[key]}
                    // />
                    <Text key={key}>
                        {ideas[key].text}
                    </Text>
                ))
            ) : (
                <Text>No todo item</Text>
            )}
        </View>

        <TextInput
            placeholder="Enter idea here"
            value={presentIdea}
            style={styles.textInput}
            onChangeText={text => {
                setPresentIdea(text);
            }}
            onSubmitEditing={addNewIdea}
        />
        <View>
            <View style={{ marginTop: 20 }}>
                <Button mode="outlined"
                    onPress={addNewIdea}
                    disabled={presentIdea == ''}
                >
                    Add new todo
                </Button>
            </View>

            <View style={{ marginTop: 20 }}>
                <Button mode="outlined" onPress={clearTodos}>
                    Clear the todo list
                </Button>
            </View>
        </View>
    </ScrollView>
}

const ToDoItem = ({ todoItem: { title, done }, id }) => {
    const [doneState, setDone] = useState(done);
    const database = getDatabase();

    const onCheck = () => {
        setDone(!doneState);
        update(ref(database, '/todos'), {
            [id]: {
                title,
                done: !doneState,
            },
        });
    };
    return (
        <View style={styles.todoItem}>
            <Checkbox
                onPress={onCheck}
                status={doneState ? 'checked' : 'unchecked'}
            // value={doneState}
            />
            <Text style={[styles.todoText, { opacity: doneState ? 0.2 : 1 }]}>
                {title}
            </Text>
        </View>
    );
};

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