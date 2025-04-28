import Icon from "react-native-vector-icons/Feather";
import React , {useState , useEffect}from "react";
import { View, Text, Image, StyleSheet, FlatList, Dimensions, TextInput, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
const { width } = Dimensions.get("window");
const cardWidth = width / 2 - 24;
import Data from '../../components/RealData';
import images from '../../components/images';
import Categories from "../../components/Categories";
import DispalyCategories from "../DispalyCategories";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {db} from '../../firebase';
import { collection, onSnapshot } from "firebase/firestore";


const HomePage = () => {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "products"), (snapshot) => {
      const usersData = snapshot.docs.map((doc) => ({
        docId: doc.id,  ...doc.data(),
      }));
      setProducts(usersData);
    });

    return () => unsubscribe();
  }, []);

  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const applyDiscount = (price, discountPercent ) => {
    return price - (price * discountPercent) / 100;
  };
  const Item = ({ item }) => {
    const router = useRouter();
  

    return (
      <TouchableOpacity onPress={() => router.push(`/${item.docId}`)}>
        <View style={styles.card}>
          <View style={{ position: 'relative', width: '100%', height: 120 }}>
            <Image source={{uri:item.image}} style={styles.image} />
            <View style={styles.discountContainer}>
              <Icon name="tag" size={14} color="#fff" />
              <Text style={styles.discountText}>{item.discount}% OFF</Text>
            </View>
          </View>
  
          <Text style={styles.title}>{item.name}</Text>
  
          <View style={styles.priceContainer}>
            <Text style={styles.oldPrice}>{item.price} EGP</Text>
            <Text style={styles.newPrice}>{applyDiscount(item.price , item.discount)} EGP</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  

  useEffect(() => {
    const checkStorage = async () => {
      try {
        const data = await AsyncStorage.getItem('userData');
  
        if (data !== null) {
          const parsedData = JSON.parse(data);
          console.log('Parsed userData:', parsedData);
        } else {
          console.log('No userData found in storage.');
        }
      } catch (error) {
        console.log('Error reading userData from storage:', error);
      }
    };
  
    checkStorage();
  }, []); 
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
     
     <View style={styles.header}>
  <TouchableOpacity onPress={() => router.push("/Settings")}>
    <View style={styles.headerIconContainer}>
    <Icon name="settings" size={20} color="#fff" />
    </View>
  </TouchableOpacity>
  <TouchableOpacity onPress={() => router.push("/Cart")}>
    <View style={styles.headerIconContainer}>
      <Icon name="shopping-cart" size={20} color="#fff" />
    </View>
  </TouchableOpacity>
</View>


     
      <TouchableOpacity onPress={() => router.push("/Search")}>
        <View style={styles.searchBar}>
          <Icon name="search" size={20} color="#888" style={styles.icon} />
          <TextInput 
            style={styles.input} 
            placeholder="Search..." 
            placeholderTextColor="#aaa" 
            editable={false} 
          />
        </View>
      </TouchableOpacity>

      
      <Text style={styles.sectionTitle}>Categories</Text>
      <FlatList
        data={Categories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
           <TouchableOpacity onPress={() => {
           router.push(`/DispalyCategories?title=${item.name}`)
          
           }}>
          <View style={styles.categoryItem}>
           
  <Image source={item.image} style={styles.categoryImage} />

   {selectedCategory && <DispalyCategories title = {selectedCategory}/>}
            <Text style={styles.categoryText}>{item.name}</Text>
          </View></TouchableOpacity>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />

<View style={styles.imageContainer}>
  <Image source={require("../../assets/images/banner_mens.png")} style={styles.bannerimage} />
</View>
      <Text style={styles.sectionTitle}>Top Selling</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.docId}
  //       renderItem={({ item }) => (
  //           <TouchableOpacity onPress={() => router.push(`/${item.id}`)}>
  //         <View style={styles.card}>
  //         <View style={{ position: 'relative', width: '100%', height: 120 }}>
  //   <Image source={images[item.image]} style={styles.image} />
    
  //   <View style={styles.discountContainer}>
  //     <Icon name="tag" size={14} color="#fff" />
  //     <Text style={styles.discountText}>50% OFF</Text>
  //   </View>
  // </View>
  //           <Text style={styles.title}>{item.name}</Text>
  //           <View style={styles.priceContainer}>
  //       <Text style={styles.oldPrice}>{item.price} EGP</Text>
  //       <Text style={styles.newPrice}>{applyDiscount(item.price)} EGP</Text>
  //     </View>
  //         </View>
  //         </TouchableOpacity>
  //       )}
  renderItem={({ item }) => <Item key ={item.docId}item={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />

     
      <Text style={styles.sectionTitle}>New in</Text>
      <FlatList
        data={products.slice(-5)}
        keyExtractor={(item) => item.docId}
        renderItem={({ item }) => (
          //  <TouchableOpacity onPress={() => router.push(`/${item.id} `)}>
          // <View style={styles.card}>
          //   <Image source={images[item.image]} style={styles.image} />
          //   <Text style={styles.title}>{item.name}</Text>
          //   <Text style={styles.price}>{item.price}</Text>
          // </View>
          // </TouchableOpacity>
          <Item key ={item.docId}item={item} />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.newIn}
      />
      <Text style={styles.sectionTitle}>ٌRecommend For You </Text>
      <FlatList
        data={[...products].sort(() => Math.random() - 0.5).slice(0, 4)}
        keyExtractor={(item) => item.docId}
        renderItem={({ item }) => (
          //  <TouchableOpacity onPress={() => router.push(`/${item.id}`)}>
          // <View style={styles.card}>
          //   <Image source={images[item.image]} style={styles.image} />
          //   <Text style={styles.title}>{item.name}</Text>
          //   <Text style={styles.price}>{item.price}</Text>
          // </View>
          // </TouchableOpacity>
          <Item key ={item.docId} item={item} />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.newIn}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 3,
    borderRadius: 25,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 20,
  },
  icon: {
     marginRight: 10 
    },
  input: {
     flex: 1, 
     fontSize: 16, 
     color: "#333" 
    },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    fontFamily: "cursive"
  },
  listContainer: { 
    paddingBottom: 20 
  },
  card: {
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
    height: 250, 
    justifyContent: 'space-between', 
  },
  
  image: {
    width: '100%', 
    height: 120,
    resizeMode: 'contain', 
    borderRadius: 10,
  },

  title: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10, 
    textAlign: 'center',
    color: '#333',
  },

  price: {
    fontSize: 14,
    color: '#757575',
    marginTop: 8, 
    textAlign: 'center', 
  },
  newIn: {
    paddingBottom: 20,
  },
  categoryItem: {
    alignItems: "center",
    marginHorizontal: 10,
  },
  categoryImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  categoryText: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: "bold",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerIconContainer: {
    backgroundColor: "#000",
    width: 45,
    height: 45,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  bannerimage: {
    width: '100%',
    height: 120, 
    resizeMode: 'contain', // use 'cover' instead of 'contain' for better fit
    borderRadius: 10,
  },
  imageContainer: {
    width: 370, // أو عرض معين حسب احتياجك
    // height: 200, // تحديد ارتفاع مناسب للصورة
  
  },
  discountContainer: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "#E91E63",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  discountText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  oldPrice: {
    textDecorationLine: "line-through",
    color: "#888",
    fontSize: 14,
  },
  newPrice: {
    color: "#E91E63",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default HomePage;
