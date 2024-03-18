import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, PermissionsAndroid, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Camera, useCameraDevice } from 'react-native-vision-camera';

const MainScreen = ({navigation}) => {
  const device = useCameraDevice('back'); // Specify the camera device type (e.g., 'back' or 'front')
  const camera = useRef(null);
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    checkPermission();
  }, []);

  const checkPermission = async () => {
    try {
      const cameraPermission = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
      const microphonePermission = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO);

      if (cameraPermission === PermissionsAndroid.RESULTS.GRANTED && microphonePermission === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera and microphone permissions granted');
      } else {
        console.log('Camera and/or microphone permissions denied');
      }
    } catch (error) {
      console.error('Error checking permissions:', error);
    }
  };

  const startRecording = async () => {
    if (camera.current && !isRecording) {
      try {
        await camera.current.startRecording({
          onRecordingFinished: (result) => {
            if (result) {
              console.log('Recording finished:', result.video);
            } else {
              console.error('Recording finished, but result is undefined');
            }
          },
          onRecordingError: (error) => {
            console.error('Recording error:', error);
          },
        });
        console.log('Recording started');
        setIsRecording(true);
      } catch (error) {
        console.error('Error starting recording:', error);
        setIsRecording(false);
      }
    }
  };

  const stopRecording = async () => {
    if (camera.current && isRecording) {
      try {
        await camera.current.stopRecording();
        console.log('Recording stopped');
        setIsRecording(false);
      } catch (error) {
        console.error('Error stopping recording:', error);
        setIsRecording(false);
      }
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const handleTranslatePress = () => {
    // Add your translation logic here
    console.log('Translate button pressed');
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.view1}>
        <Text style={styles.heading}>Camera Capture</Text>
        <View style={styles.camera}>
          <Camera
              ref={(ref) => (camera.current = ref)}
              style={styles.cameraPreview}
              device={device}
              isActive={true}
              video
            />
        </View>

        <View style={styles.buttonView}>
          <TouchableOpacity style={styles.button}><Text style={styles.text}>Capture</Text></TouchableOpacity>
        </View>
      </View>

      <View style={styles.view2}>

        <TouchableOpacity onPress={()=>navigation.navigate('Main1')} style={styles.button2}><Text style={styles.text}>Translate</Text></TouchableOpacity>
      </View>
        
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen:{
    display:'flex',
    flexDirection:'column',
    height:'100%'
  },
  view1:{
    flex:7,
  },
  view2:{
    flex:1,
    alignItems:'end'
  },
  buttonArea:{
    display:'flex',
  },
  buttonView:{
    display:'flex',
    alignItems:'flex-end',
  },
  heading:{
    color:'#222',
    fontSize:20,
    textAlign:'center',
    paddingVertical:10,
  },
  button:{
    backgroundColor:'#222',
    margin:10,
    width:200,
    padding:5,
    
    borderRadius:10,
  },

  button2:{
    backgroundColor:'#222',
    margin:10,
    marginVertical:20,
    marginHorizontal:20,
    padding:10,
    borderRadius:10,
  },
  text:{
    color:"#fff",
    textAlign:'center',
    fontSize:16,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera:{
    width:'100%',
    height:300,
  },
  cameraContainer: {
    flex: 2, // Adjust the height as needed
    width: '100%',
  },
  cameraPreview: {
    ...StyleSheet.absoluteFillObject,
  },
  bottomRightButtons: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  translateButton: {
    backgroundColor: '#222', // Blue color
    padding: 20,
    borderRadius: 10,
    marginLeft: 10,
  },
  translateButtonText: {
    color: '#ffffff', // White color
    fontSize: 18,
  },
  captureButtonContainer: {
    flex: 1, // Adjust the height as needed
    justifyContent: 'center',
  },
  captureButton: {
    backgroundColor: '#ff0000', // Red color
    padding: 20,
    borderRadius: 50, // Circular shape
  },
  captureButtonText: {
    color: '#ffff00', // Yellow color
    fontSize: 18,
  },
});

export default MainScreen;
