import { Tabs } from "expo-router";
import { Slot } from "expo-router";
import { StatusBar } from 'react-native';
import AdminBar from '../../components/AdminBar';
export default function AdminLayout() {
  return (
    <>
    <StatusBar backgroundColor={"#f5e1d2"} barStyle="dark-content" />
    <Slot />  
    <AdminBar />  
  </>
  );
}
