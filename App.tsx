// Dependenceis
import React from 'react';
import { SafeAreaView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// Components
import CountdownTimer from './app/components/CountdownTimer';
import CountdownProvider from './app/components/CountdownProvider';

// Load icons
MaterialIcons.loadFont();
Ionicons.loadFont();

export function App() {
  return (
    <SafeAreaView style={{ alignItems: 'center', flex: 1 }}>
      <CountdownProvider>
        <CountdownTimer />
      </CountdownProvider>
    </SafeAreaView>
  );
};

export default App;
