import { Tabs } from "expo-router";
import { Slot } from "expo-router";
import Bar from '../../components/Bar';
import { StatusBar } from 'react-native';
export default function UserLayout() {
  return (
    <>
    <StatusBar backgroundColor={"#f5e1d2"} barStyle="dark-content" />
      <Slot />  
      <Bar />  
      
    </>
  );
}
