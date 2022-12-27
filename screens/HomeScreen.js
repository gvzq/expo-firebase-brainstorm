
import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Dimensions
} from 'react-native';
import {
  Text,
  Button,
  Card,
  Title, Paragraph
} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
let ScreenHeight = Dimensions.get("window").height;

export const HomeScreen = ({ navigation }) => {



  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainerStyle}
    >
      <View style={styles.container}>

        <Card
          onPress={() => { navigation.navigate('Create') }}
          style={styles.card}
        >
          <Card.Content>
            <Title>Create a Room</Title>
            <Paragraph>Card content</Paragraph>
            <Ionicons name="add-circle-outline" size={50} />
          </Card.Content>
        </Card>

        <Card
          onPress={() => { navigation.navigate('Join') }}
          style={styles.card}
        >
          <Card.Content>
            <Title>Join a Room</Title>
            <Paragraph>Card content</Paragraph>
            <Ionicons name="enter-outline" size={50} />
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 12,
  },
  contentContainerStyle: {
    padding: 24,
  },
  card: {
    height: ScreenHeight / 3,
    paddingVertical: 12,
  }
});