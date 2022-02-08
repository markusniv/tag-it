import React from 'react';
import {StatusBar} from 'expo-status-bar';
import Navigator from "./navigators/Navigator";
import {MainProvider} from './contexts/MainContext';

export default function App() {
  return (
    <MainProvider>
      <Navigator />
      <StatusBar style="auto" />
    </MainProvider>
  );
}
