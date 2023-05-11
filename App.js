import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Home from './screen/Home';
import SignUpScreen from './screen/SignUp';

// const Stack = createStackNavigator();

// function MyStack () {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name='Conduct Disorder - SignUp' component={SignUpScreen} />
//       <Stack.Screen name='Conduct Disorder - Home' component={Home} />
//     </Stack.Navigator>
//   );
// }

export default function App() {

  const [userCredent, setUserCredent] = useState();

  console.log(userCredent)

  return (
    <SignUpScreen userCredent={userCredent} setUserCredent={setUserCredent}>
      <Home userCredent={userCredent}/>
    </SignUpScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
