import {Video} from 'expo-av';
import {View} from 'react-native';
import {Asset} from 'expo-asset';
import {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';

const VideoPlayer = forwardRef(({source}, ref) => {
  const [videoURI, setVideoURI] = useState(null);
  const playerRef = useRef(null);

  useEffect(() => {
    async function loadVideoAsset() {
      const asset = Asset.fromModule(source);
      await asset.downloadAsync();
      setVideoURI(asset);
    }

    loadVideoAsset().then(() => {
      resetVideo();
    });
  }, [source]);

  const resetVideo = async () => {
    await playerRef.current.setPositionAsync(0);
    await playerRef.current.playAsync();
    // if (isPlaying) {
    //   await playerRef.current.playAsync();
    // }
  };

  useImperativeHandle(ref, () => ({
    resetVideo: resetVideo,
  }));

  return (
    <View>
      {videoURI && (
        <Video
          ref={playerRef} // Store reference
          source={{uri: videoURI.localUri}}
          shouldPlay={true}
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      )}
    </View>
  );
});

export default VideoPlayer;
