import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { ActivityIndicator, Text, View, TouchableOpacity, StyleSheet } from 'react-native';

export default function App() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);


  const callOcrApi = async () => {
    try {
      let imageURI = "https://www.factureromovil.com/upload/noticias/061cb9440.jpg"
      const formData = new FormData();
      formData.append('image', {
        uri: imageURI,
        type: "image/jpeg",
        name: "photo.jpg"
     }) 
      const response = await fetch('http://13.59.105.135:8080/image',
        {
          method: 'post',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: formData
        }
      );
      const json = await response.json();
      console.log(json)
      setData(json.response);
     
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const cleanScreen = () => {
    setData([])
    setLoading(true)
  }
/*
 useEffect(() => {
   getMovies();
 }, []);*/

 return (
   <View style={{ flex: 1, padding: 30, marginTop: 20 }}>


    {isLoading ? (

    <TouchableOpacity style={styles.button} onPress={callOcrApi}>
      <Text style={styles.buttonText}>Call the API</Text>
    </TouchableOpacity>


    ):(


    <View>
      <TouchableOpacity style={styles.button} onPress={cleanScreen}>
        <Text style={styles.buttonText}>Clean the Screen</Text>
      </TouchableOpacity>
      <Text style={styles.textResponse}>Edad: {data.edad}</Text>
      <Text style={styles.textResponse}>Fecha de naciemiento: {data.fechaNacimiento}</Text>
    </View>
    )}


   </View>
 );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#292929",
  },
  title: { fontSize: 30, color: "#fff" },
  image: { height: 200, width: 200, borderRadius: 100 },
  button: {
    backgroundColor: "blue",
    padding: 7,
    marginTop: 10,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: { color: "#fff" },
  flatList: {
    padding: 5,
    marginTop: 10
  },
  textResponse: {
    marginTop: 10
  }
});