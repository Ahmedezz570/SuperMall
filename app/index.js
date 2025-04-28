// import { View, Text , ScrollView , TextInput , Pressable , StatusBar , 
    
    
    
    
//     StyleSheet} from 'react-native'
// import React from 'react'

// const index = () => {
//   return (
// <>

// {/* <View >
//       <Text 
//       numberOfLines={1} 
//       ellipsizeMode="tail"
//       onPress={() => alert('Text Pressed!')}
//       selectable={true}  // copy text
//       style={{ fontWeight: 'bold', fontStyle: 'italic' , letterSpacing: 2 , textAlign: 'center'}}
//       >Hello, React Native!??????????????bggtygvhbjhnyughbujnhnnnn</Text>
//     </View> */}


// {/* <ScrollView 
// // horizontal
// showsVerticalScrollIndicator={true}
// contentContainerStyle={{ padding: 20 }}
// // horizontal pagingEnabled
// bounces={false}
// onScroll={(event) => console.log(event.nativeEvent.contentOffset.y)}
//   scrollEventThrottle={16}
// >
// <Text >عنصر 1</Text>
// <Text >عنصر 2</Text>
// <Text >عنصر 3</Text>
// <Text >عنصر 4</Text>
// <Text >عنصر 5</Text>
// <Text >عنصر 6</Text>
// <Text >عنصر 7</Text>
// <Text >عنصر 8</Text>
// <Text >عنصر 8</Text>
// <Text >عنصر 8</Text>
// <Text >عنصر 8</Text>
// <Text >عنصر 8</Text>
// <Text >عنصر 8</Text>
// <Text >عنصر 8</Text>
// <Text >عنصر 8</Text>
// <Text >عنصر 8</Text>
// <Text >عنصر 8</Text>
// <Text >عنصر 8</Text>
// <Text >عنصر 8</Text>
// <Text >عنصر 8</Text>
// <Text >عنصر 8</Text>
// <Text >عنصر 8</Text>
// <Text >عنصر 8</Text>
// <Text >عنصر 8</Text>
// <Text >عنصر 8</Text>
// <Text >عنصر 8</Text>
// <Text >عنصر 8</Text>
// <Text >عنصر 8</Text>
// <Text >عنصر 8</Text>
// <Text >عنصر 8</Text>
// <Text >عنصر 8</Text>
// <Text >عنصر 8</Text>
// <Text >عنصر 8</Text>
// <Text >عنصر 8</Text>
// <Text >عنصر 8</Text>
// <Text >عنصر 8</Text>
// <Text >عنصر 8</Text>
// <Text >عنصر 8</Text>
// <Text >عنصر 8</Text>
// <Text >عنصر 8</Text>
// <Text >عنصر 8</Text>
// <Text >عنصر 8</Text>
// <Text >عنصر 8</Text>
// <Text >عنصر 8</Text>
// <Text >عنصر 8</Text>
// <Text >عنصر 8</Text>
// <Text >عنصر 8</Text>
// <Text >عنصر 8</Text>
// <Text >عنصر 8</Text>
// <Text >عنصر 8</Text>
// <Text >عنصر 8</Text>
// <Text >عنصر 8</Text>
// <Text >عنصر 8</Text>
// <Text >عنصر 8</Text>
// <Text >عنصر 8</Text>
// </ScrollView> */}

// {/* <ScrollView keyboardShouldPersistTaps="handled">
//   <TextInput placeholder="اكتب هنا" />
// </ScrollView> */}

// {/* 
// <Pressable 
       
//       onPress={() => console.log("تم الضغط!")}
//       onLongPress={() => console.log("تم الضغط مطولًا!")}
//       onPressIn={() => console.log("بدأ الضغط!")}
//   onPressOut={() => console.log("تم ترك الزر!")}
//   style={({ pressed }) => [
    
//     { backgroundColor: pressed ? "red" : "blue" }
//   ]}
//   hitSlop={20} // يوسع منطقة الضغط بمقدار 20 بكسل
//   android_ripple={{ color: "lightblue" }}
//     >
//       <Text >اضغط هنا</Text>
//     </Pressable> */}
//  <StatusBar backgroundColor="red" 
// //  barStyle="light-content"
//  barStyle="dark-content"
// // barStyle="default"
// hidden={false}
// translucent={true} 
//  />



// {/* <View style={{ flexDirection: 'row' }}>
//   <View style={{ width: 50, height: 50, backgroundColor: 'red' }} />
//   <View style={{ width: 50, height: 50, backgroundColor: 'blue' }} />
//   <View style={{ width: 50, height: 50, backgroundColor: 'green' }} />
// </View>

// <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
//   <View style={{ width: 50, height: 50, backgroundColor: 'red' }} />
//   <View style={{ width: 50, height: 50, backgroundColor: 'blue' }} />
//   <View style={{ width: 50, height: 50, backgroundColor: 'green' }} />
// </View>

// <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//   <View style={{ width: 50, height: 50, backgroundColor: 'red' }} />
//   <View style={{ width: 50, height: 50, backgroundColor: 'blue' }} />
//   <View style={{ width: 50, height: 50, backgroundColor: 'green' }} />
// </View>

// <View style={{ flexDirection: 'row' }}>
//   <View style={{ width: 50, height: 50, backgroundColor: 'red', alignSelf: 'flex-end' }} />
//   <View style={{ width: 50, height: 50, backgroundColor: 'blue' }} />
// </View> */}

// </>
//   )
// }




// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//       backgroundColor: '#f0f0f0',
//     },
//     box: {
//       width: 150,
//       height: 100,
//       backgroundColor: 'lightblue',
  
//       /* 🟠 Margin: مسافة خارجية حول العنصر */
//       margin: 20,  
  
//       /* 🔵 Border: تحديد الإطار */
//       borderWidth: 5,
//       borderColor: 'blue',
//       borderRadius: 10,
  
//       /* 🟢 Padding: مسافة داخلية بين الإطار والمحتوى */
//       padding: 36,
  
//       justifyContent: 'center',
//       alignItems: 'center',
//     },
//     text: {
//       fontSize: 16,
//       fontWeight: 'bold',
//     },
//   });
// export default index










// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// const NoWrapExample = () => {
//   return (
//     <View style={styles.container}>
//       <View style={styles.box}><Text style={styles.text}>1</Text></View>
//       <View style={styles.box}><Text style={styles.text}>2</Text></View>
//       <View style={styles.box}><Text style={styles.text}>3</Text></View>
//       <View style={styles.box}><Text style={styles.text}>4</Text></View>
//       <View style={styles.box}><Text style={styles.text}>5</Text></View>
//       <View style={styles.box}><Text style={styles.text}>5</Text></View>
//       <View style={styles.box}><Text style={styles.text}>5</Text></View>
//       <View style={styles.box}><Text style={styles.text}>5</Text></View>
//       <View style={styles.box}><Text style={styles.text}>5</Text></View>
//       <View style={styles.box}><Text style={styles.text}>5</Text></View>
//       <View style={styles.box}><Text style={styles.text}>5</Text></View>
//       <View style={styles.box}><Text style={styles.text}>5</Text></View>
//       <View style={styles.box}><Text style={styles.text}>5</Text></View>
//       <View style={styles.box}><Text style={styles.text}>5</Text></View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row', 
//     flexWrap: 'wrap', 
//     backgroundColor: '#f0f0f0',
//   },
//   box: {
//     width: 50,
//     height: 100,
//     backgroundColor: '#3498db',
//     margin: 5,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   text: {
//     color: 'white',
//     fontSize: 18,
//   }
// });

// export default NoWrapExample;




// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import TestFlatList from '../components/testfaltlist';
// import SearchScreen from '../components/Search';
// import FilterBar from '../components/FilterBar';
// import Bar from '../components/Bar';
// import Additem from '../components/Additem';
// import AdminBar from '../components/AdminBar';
// const AlignContentExample = () => {
//   return (
//   //  <TestFlatList/>
//   // <SearchScreen/>
//   <>
//   {/* <Text>ygyyuhuhuuuuuui</Text> */}
//   {/* <SearchScreen /> */}
//   {/* <Bar /> */}
//   {/* <AdminBar /> */}
//   {/* <Additem /> */}
//   {/* <FilterBar/> */}
//   </>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     alignContent: 'space-around', 
//     backgroundColor: '#f0f0f0',
//   },
//   box: {
//     width: 100,
//     height: 100,
//     backgroundColor: '#3498db',
//     margin: 5,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   text: {
//     color: 'white',
//     fontSize: 18,
//   }
// });

// export default AlignContentExample;
import React, { useEffect, useContext, useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { AuthContext } from '../context/AuthContext';

const WelcomeScreen = () => {
  const router = useRouter();
  const { user, loading } = useContext(AuthContext);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 7000); 

    return () => clearTimeout(timer); 
  }, []);

  useEffect(() => {
    if (!loading && isReady) {
      if (user) {
        const isAdmin = user?.isAdmin || false; // تجنب الأخطاء في حالة عدم وجود `isAdmin`
        router.replace(isAdmin ? '/Admin/Productss' : '/User/HomePage');
      } else {
        router.replace('/Auth/Login');
      }
    }
  }, [user, loading, isReady, router]);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <View style={styles.content}>
          <Image source={require('../assets/images/pngwing.com.png')} style={styles.logo} />
          <Text style={styles.title}>SUPERMALL</Text>
          <ActivityIndicator size="large" color="#4A3222" style={{ marginTop: 20 }} />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAE5D3',
    paddingHorizontal: 20,
  },
  content: {
    bottom: 50,
    alignItems: 'center',
  },
  title: {
    fontSize: 38,
    fontWeight: 'bold',
    color: '#4A3222',
    marginTop: 1,
  },
  logo: {
    width: 90,
    height: 100,
    resizeMode: 'contain',
  },
  loadingText: {
    fontSize: 20,
    color: '#4A3222',
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default WelcomeScreen;









// import { View, Text } from 'react-native';
// import React from 'react';
// import Testfaltlist from '../components/Testfaltlist';
// const index = () => {
//   return (
//     <Testfaltlist />
//   )
// }

// export default index;
