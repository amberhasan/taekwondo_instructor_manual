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

  useImperativeHandle(ref, () => ({}));

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
        isLooping
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
