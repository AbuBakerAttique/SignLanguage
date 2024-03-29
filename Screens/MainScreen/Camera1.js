import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, PermissionsAndroid, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Camera, useCameraDevice } from 'react-native-vision-camera';
import { launchImageLibrary } from 'react-native-image-picker';

const Camera1 = ({ navigation }) => {
  const device = useCameraDevice('back');
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
    if (!isRecording) {
      if (camera.current) {
        try {
          await camera.current.startRecording({
            onRecordingFinished: (video) => console.log(video),
            onRecordingError: (error) => console.error(error)
          });
          console.log('Recording started');
          setIsRecording(true);
        } catch (error) {
          console.error('Error starting recording:', error);
          setIsRecording(false);
        }
      }
    } else {
      console.log('Recording is already in progress');
    }
  };

  const stopRecording = async () => {
    if (isRecording) {
      if (camera.current) {
        try {
          await camera.current.stopRecording();
          console.log('Recording stopped');
          setIsRecording(false);
        } catch (error) {
          console.error('Error stopping recording:', error);
          setIsRecording(false);
        }
      }
    } else {
      console.log('No recording in progress');
    }
  };

  const handleUpload = () => {
    const options = {
        mediaType: 'video',
        videoQuality: 'high',
        durationLimit: 10, // Limit video duration if needed
    };

    launchImageLibrary(options, async (response) => {
        console.log('Response = ', response);

        if (response.didCancel) {
            console.log('User cancelled image picker');
        } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
        } else {
            if (response.assets && response.assets.length > 0) {
                const selectedVideoUri = response.assets[0].uri;
                console.log('Selected video:', selectedVideoUri);

                // Prepare the form data
                const formData = new FormData();
                formData.append('video', {
                    uri: selectedVideoUri,
                    type: 'video/mp4', // or your video's mime type
                    name: response.assets[0].fileName || 'upload.mp4',
                });

                // Perform the upload
                try {
                    const uploadResponse = await fetch('https://yourserver.com/upload', {
                        method: 'POST',
                        body: formData,
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    });

                    const uploadResult = await uploadResponse.json(); // assuming server responds with JSON
                    console.log('Upload successful:', uploadResult);
                } catch (error) {
                    console.error('Upload failed:', error);
                }
            } else {
                console.log('No video selected');
            }
        }
    });
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
            video={true}
            audio={true}
          />
        </View>

        <View style={styles.buttonView}>
          <TouchableOpacity onPress={isRecording ? stopRecording : startRecording} style={styles.button}>
            <Text style={styles.text}>{isRecording ? 'Stop Recording' : 'Start Recording'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonView}>
          <TouchableOpacity onPress={handleUpload} style={styles.button}>
            <Text style={styles.text}>Upload</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.view2}>
        <TouchableOpacity onPress={() => navigation.navigate('Main1')} style={styles.button2}><Text style={styles.text}>Translate1</Text></TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  },
  view1: {
    flex: 7,
  },
  view2: {
    flex: 1,
    alignItems: 'end'
  },
  buttonView: {
    display: 'flex',
    alignItems: 'flex-end',
  },
  heading: {
    color: '#222',
    fontSize: 20,
    textAlign: 'center',
    paddingVertical: 10,
  },
  button: {
    backgroundColor: '#223',
    margin: 10,
    width: 200,
    padding: 5,
    borderRadius: 10,
  },
  button2: {
    backgroundColor: '#222',
    margin: 10,
    marginVertical: 20,
    marginHorizontal: 20,
    padding: 10,
    borderRadius: 10,
  },
  text: {
    color: "#fff",
    textAlign: 'center',
    fontSize: 16,
  },
  camera: {
    width: '100%',
    height: 300,
  },
  cameraPreview: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Camera1;
