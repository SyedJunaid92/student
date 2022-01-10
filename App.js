import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Signup from './Student/Signup';
import Login from './Student/Login';
import Table from './Student/Table';
import mcqsSol from './Student/McqsSol';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="detail" component={Table} />
        <Stack.Screen name="mcqs" component={mcqsSol} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
