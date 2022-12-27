import React, { useState, useEffect, useContext } from 'react';
import { AuthenticatedUserContext } from '../providers';
import {
    StyleSheet,
    View,
    ScrollView
} from 'react-native';
import {
    Text,
    Checkbox,
    TextInput,
    Button
} from 'react-native-paper';
import {
    ref,
    onValue,
    push,
    update,
    remove,
    getDatabase
} from 'firebase/database';

export const ActivityScreen = ({ navigation }) => {

    const [todos, setTodos] = useState({});
    const [presentTodo, setPresentTodo] = useState('');
    const todosKeys = Object.keys(todos);
    const database = getDatabase();
    const { user } = useContext(AuthenticatedUserContext);

    useEffect(() => {
        return onValue(ref(database, '/todos'), querySnapShot => {
            let data = querySnapShot.val() || {};
            let todoItems = { ...data };
            setTodos(todoItems);
        });
    }, []);

    function addNewTodo() {
        push(ref(database, '/todos'), {
            done: false,
            title: presentTodo,
        });
        setPresentTodo('');
    }

    function clearTodos() {
        remove(ref(database, '/todos'));
    }

    return <ScrollView>
        <View>
            {todosKeys.length > 0 ? (
                todosKeys.map(key => (
                    <ToDoItem
                        key={key}
                        id={key}
                        todoItem={todos[key]}
                    />
                ))
            ) : (
                <Text>No todo item</Text>
            )}
        </View>

        <TextInput
            placeholder="New todo"
            value={presentTodo}
            style={styles.textInput}
            onChangeText={text => {
                setPresentTodo(text);
            }}
            onSubmitEditing={addNewTodo}
        />
        <View>
            <View style={{ marginTop: 20 }}>
                <Button mode="outlined"
                    onPress={addNewTodo}
                    disabled={presentTodo == ''}>
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