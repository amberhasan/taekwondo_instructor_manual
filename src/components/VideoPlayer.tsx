import {Video} from 'expo-av';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {Asset} from 'expo-asset';
import {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';

const VideoPlayer = forwardRef(({source}, ref) => {
  const videoRef = useRef(null);
  const [isBuffering, setIsBuffering] = useState(false);

  const handlePlaybackStatusUpdate = playbackStatus => {
    if (playbackStatus.isBuffering) {
      setIsBuffering(true);
    } else {
      setIsBuffering(false);
    }
  };

  // component did mount - when you click next or previous button, play the reset video
  useEffect(() => {
    replayVideo();
  }, [source]);

  const replayVideo = async () => {
    await videoRef.current.setPositionAsync(0); // Set the position to the start
    videoRef.current.playAsync(); // Play the video
  };

  useImperativeHandle(ref, () => ({
    replay: replayVideo,
  }));

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        source={{uri: source}}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="cover"
        shouldPlay
        isLooping={false} // You can loop video by setting this to true
        onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
        style={styles.video}
      />
      {isBuffering && (
        <View style={styles.bufferingContainer}>
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  bufferingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
});

export default VideoPlayer;
