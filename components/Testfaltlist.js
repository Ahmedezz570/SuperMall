import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Pressable } from 'react-native';
import lemon from "../assets/images/lemon.png";
import mango from "../assets/images/mango.png";

const DATA = [
    { id: 1, text: "1234", icon: lemon },
    { id: 2, text: "lemon", icon: mango },
    { id: 3, text: "mango", icon: lemon },
    { id: 4, text: "456", icon: mango },
    { id: 5, text: "Mohameddddd", icon: lemon },
    { id: 6, text: "apple", icon: lemon },
    { id: 7, text: "banana", icon: mango },
    { id: 8, text: "orange", icon: lemon },
    { id: 9, text: "grape", icon: mango },
    { id: 10, text: "watermelon", icon: lemon },
];


const TestFlatList = () => {
    const [selectedId, setSelectedId] = useState(null);
    return (
        <>
            <FlatList

                data={DATA}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Pressable
                        onPress={() => setSelectedId(item.id)}
                        style={[
                            styles.item,
                            { backgroundColor: selectedId === item.id ? 'red' : '#f9c2ff' }
                        ]}
                    >
                        <Image source={item.icon} style={styles.image} />
                        {/* <Text style={styles.text}>{item.text}</Text> */}

                        <Pressable onPress={() => setSelectedId(item.id)} >
                            <View style={[styles.v, selectedId === item.id && styles.selectedV]}>
                                {selectedId === item.id && <Text style={styles.checkMark}>✔</Text>}
                            </View>
                            </Pressable>
                    </Pressable>
                )}


            ></FlatList>

            <Text>ahhmed</Text>
            </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 50,
        height: 50,

    },
    item: {
        flexDirection: 'row',
        padding: 20,
        backgroundColor: '#f9c2ff',
        marginVertical: 8,
        marginHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    v: {
        width: 24,
        height: 24,
        backgroundColor: 'blue',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedV: {
        backgroundColor: 'green', 
    },
    checkMark: {
        color: 'white',
        fontWeight: 'bold',
    },

});

export default TestFlatList;


// import React, { useState } from 'react';
// import { View, Text, StyleSheet, FlatList, Image, Pressable, TextInput } from 'react-native';
// import lemon from "../assets/images/lemon.png";
// import mango from "../assets/images/mango.png";

// const DATA = [
//     { id: 1, text: "1234", icon: lemon },
//     { id: 2, text: "lemon", icon: mango },
//     { id: 3, text: "mango", icon: lemon },
//     { id: 4, text: "456", icon: mango },
//     { id: 5, text: "Mohameddddd", icon: lemon },
//     { id: 6, text: "apple", icon: lemon },
//     { id: 7, text: "banana", icon: mango },
//     { id: 8, text: "orange", icon: lemon },
//     { id: 9, text: "grape", icon: mango },
//     { id: 10, text: "watermelon", icon: lemon },
// ];

// const TestFlatList = () => {
//     const [items, setItems] = useState(DATA);
//     const [search, setSearch] = useState('');

    
//     const handleDelete = (id) => {
//         setItems(prevItems => prevItems.filter(item => item.id !== id));
//     };

    
//     const handleSearch = (text) => {
//         setSearch(text);
//         if (text === '') {
//             setItems(DATA); 
//         } else {
//             const filteredItems = DATA.filter(item =>
//                 item.text.toLowerCase().includes(text.toLowerCase())
//             );
//             setItems(filteredItems);
//         }
//     };

   
//     const resetItems = () => {
//         setSearch('');
//         setItems(DATA);
//     };

//     return (
//         <View style={styles.container}>
           
//             <TextInput 
//                 placeholder="Search..." 
//                 placeholderTextColor="#777" 
//                 style={styles.searchInput}  
//                 value={search}
//                 onChangeText={handleSearch}
//             />

            
//             <FlatList
//                 data={items}
//                 keyExtractor={(item) => item.id.toString()}
//                 renderItem={({ item }) => (
//                    <View style={styles.item}>
//                         <Image source={item.icon} style={styles.image} />
//                         <Text style={styles.text}>{item.text}</Text> 
//                         <Pressable onPress={() => handleDelete(item.id)} style={styles.resetButton}>
//                             <Text style={styles.resetText}>Delete</Text>
//                     </Pressable></View>
//                 )}
//             />

//             {/* زر إعادة جميع العناصر */}
//             <Pressable onPress={resetItems} style={styles.resetButton}>
//                 <Text style={styles.resetText}>Reset</Text>
//             </Pressable>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 10,
//         alignItems: 'center',
//     },
//     searchInput: {
//         width: '90%',
//         padding: 10,
//         borderWidth: 1,
//         borderColor: '#ccc',
//         borderRadius: 8,
//         marginBottom: 10,
//     },
//     image: {
//         width: 50,
//         height: 50,
//     },
//     item: {
//         flexDirection: 'row',
//         padding: 20,
//         backgroundColor: '#f9c2ff',
//         marginVertical: 8,
//         width: '100%',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         borderRadius: 10,
//     },
//     text: {
//         fontSize: 18,
//         fontWeight: 'bold',
//     },
//     resetButton: {
//         marginTop: 20,
//         backgroundColor: 'blue',
//         padding: 15,
//         borderRadius: 10,
//     },
//     resetText: {
//         color: 'white',
//         fontSize: 18,
//         fontWeight: 'bold',
//     },
// });

// export default TestFlatList;
