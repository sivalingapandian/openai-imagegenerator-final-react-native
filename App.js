import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Pressable, Image, ActivityIndicator, ScrollView, SafeAreaView } from 'react-native';

import React, { useState } from "react";
import axios from "axios";

const OPENAI_API_KEY = "replace-with-your-key"; // Replace with your actual API key

function App() {

  const [prompt, setPrompt] = useState("owl on a boat");
  const [generatedImages, setGeneratedImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function generateImages() {
    setIsLoading(true);

    try {
      const requestData = {
        prompt: prompt,
        n: 2,
        size: "256x256", // Set the desired image size here
      };

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      };

      const response = await axios.post(
        "https://api.openai.com/v1/images/generations",
        requestData,
        {
          headers: headers,
        }
      );

      setGeneratedImages(response.data.data);
    } catch (error) {
      console.error("Error generating images:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <View
      style={styles.viewstyle}
    >
      <View style={styles.rowStyle}>
        <TextInput
          style={styles.input}
          placeholder="Enter a prompt"
          onChangeText={newText => setPrompt(newText)}
          defaultValue={prompt}
        />
      </View>

      <View style={styles.rowStyle}>
        <Pressable
          title={isLoading ? "Generating..." : "Generate Images"}
          disabled={isLoading}
          onPress={() => generateImages()}
          style={styles.button}
        >
          <Text style={styles.buttontext}>{isLoading ? "Generating..." : "Generate Images"}</Text>
        </Pressable>
      </View>

      {isLoading && <Text style={styles.loadingText}>Loading...</Text>}
      {isLoading && <ActivityIndicator size="large" />}
      {generatedImages.length > 0 && (
        <View style={styles.rowStyle}>
          {generatedImages.map((image) => (
            <View style={styles.rowStyle}>
              <Image
                source={image.url}
                style={styles.imagedisplay} />
            </View>
          ))}
        </View>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  loadingText: {
    color: 'blue',
    fontSize: 21,
    fontWeight: 'bold',
  },
  imagedisplay: {
    width: '256px',
    height: '256px',
    flex: 1,
  },
  input: {
    borderColor: "gray",
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
  buttontext: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  viewstyle: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5E2C8',
  },
  rowStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    padding: 10,
  },

});

export default App;