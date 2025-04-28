import React, { useState , useEffect} from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Dimensions,
  FlatList,
  Image
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { MaterialIcons } from "@expo/vector-icons";
import Gender from "../components/Gender";
import Sort from "../components/Sort";
import Price from "../components/Price";
import { useRouter } from "expo-router";

import  images  from '../components/images';
import {db} from '../firebase';
import { collection, onSnapshot } from "firebase/firestore";
const { width } = Dimensions.get('window');
const cardWidth = (width / 2) - 30;

const SearchFilterScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const [priceModalVisible, setPriceModalVisible] = useState(false);
  const [genderModalVisible, setGenderModalVisible] = useState(false);
  
  const [data, setData] = useState([]);


   useEffect(() => {
      const unsubscribe = onSnapshot(collection(db, "products"), (snapshot) => {
        const usersData = snapshot.docs.map((doc) => ({
          docId: doc.id,  ...doc.data(),
        }));
        setData(usersData);
      });
  
      return () => unsubscribe();
    }, []);
  const router = useRouter();

  const handleBack = () => {
    router.push("/User/HomePage");
  };

  const handleSearch = (text) => {
    setSearchText(text);
    if (text.trim() === "") {
      setData([]);
    } else {
      setData(data.filter(item => item.name.toLowerCase().includes(text.toLowerCase())));
    }
  };

  const renderItem = ({ item }) => (
     <TouchableOpacity onPress={() => {
      console.log("Item ID:", item.docId);
     router.push(`/${item.docId}`)
     
     }}>
    <View style={styles.productCard}>
      <Image source={{uri :item.image}} style={styles.productImage} />
      <Text style={styles.productTitle}>{item.name}</Text>
      <Text style={styles.productPrice}>EGP {item.price}</Text>
    </View>
    </TouchableOpacity>
  );

  return (
    <>
      <StatusBar backgroundColor={"#f5e1d2"} barStyle="dark-content" />
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <MaterialIcons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <View style={styles.searchBar}>
            <Icon name="search" size={20} color="#888" />
            <TextInput
              style={styles.input}
              placeholder="Search..."
              value={searchText}
              onChangeText={handleSearch}
            />
          </View>
        </View>

        <View style={styles.filterContainer}>
          <TouchableOpacity style={styles.filterButton}>
            <Icon name="filter" size={16} color="#000" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => setPriceModalVisible(true)}>
            <Text style={styles.text}>Price ▼</Text>
            <Price modalVisible_2={priceModalVisible} setModalVisible_2={setPriceModalVisible} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>On Sale</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => setSortModalVisible(true)}>
            <Sort modalVisible={sortModalVisible} setModalVisible={setSortModalVisible} />
            <Text style={styles.text}>Sort by ▼</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => setGenderModalVisible(true)}>
            <Gender modalVisible_1={genderModalVisible} setModalVisible_1={setGenderModalVisible} />
            <Text style={styles.text}>Men ▼</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.found}>
          <Text style={styles.foundText}>{data.length} Results Found</Text>
        </View>

        
        {searchText.trim() !== "" && data.length === 0 && (
          <View style={styles.noResults}>
            <Icon name="search" size={100} color="black" />
            <Text style={styles.noResultsText}>Sorry, We Couldn't find any matching result for your Search .</Text>
          </View>
        )}

       
        {searchText.trim() !== "" && data.length > 0 && (
          <FlatList
            data={data}
            keyExtractor={(item) => item.docId}
            renderItem={renderItem}
            contentContainerStyle={styles.productList}
            numColumns={2}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5"
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 25,
  },
  input: {
    flex: 1,
    marginLeft: 10,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 15,
  },
  button: {
    backgroundColor: "#f5e1d2",
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 20,
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
  found: {
    padding: 8,
    borderRadius: 20,
    marginTop: 15,
  },
  foundText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  productList: {
    paddingHorizontal: 5,
    paddingBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  productCard: {
    width: cardWidth,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    margin: 8,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    alignItems: 'center',
    height: 230,
  },
  productImage: {
    width: '100%',
    height: 120, 
    resizeMode: 'contain',
    borderRadius: 10,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
    color: '#333',
  },
  productPrice: {
    fontSize: 14,
    color: '#757575',
    marginTop: 'auto', 
    marginBottom: 5,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5e1d2",
    padding: 8,
    borderRadius: 20,
  },
  noResults: {
    marginTop: 80,
    padding: 10,
    alignItems: "center",
  },
  noResultsText: {
    color: "black",
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default SearchFilterScreen;
