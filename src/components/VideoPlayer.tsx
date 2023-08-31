import {Video} from 'expo-av';
import {View} from 'react-native';
import {Asset} from 'expo-asset';
import {useEffect, useRef, useState} from 'react';

const VideoPlayer = ({source}) => {
  const [videoURI, setVideoURI] = useState(null);
  const playerRef = useRef(null);

  useEffect(() => {
    async function loadVideoAsset() {
      const asset = Asset.fromModule(source);
      await asset.downloadAsync();
      console.log('asset', asset);
      setVideoURI(asset);
    }

    loadVideoAsset();
  }, [source]);

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
            backgroundColor: 'red',
          }}
        />
      )}
    </View>
  );
};

export default VideoPlayer;
