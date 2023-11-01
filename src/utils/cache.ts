import * as FileSystem from 'expo-file-system';

function removeQueryString(url: string) {
  const parts = url.split('.mp4');
  return parts.length > 1 ? parts[0] + '.mp4' : url;
}

async function cache(uri: string) {
  try {
    // uri = http://exmaple.com/video/a
    // localUri = file://cache/videos/a
    const trimmedUri = removeQueryString(uri);
    const cacheDirectory = FileSystem.cacheDirectory + 'videos/';
    const cacheLocation = cacheDirectory + encodeURIComponent(trimmedUri);

    const dirInfo = await FileSystem.getInfoAsync(cacheDirectory);
    if (!dirInfo.exists) {
      console.log('Creating cache directory');
      await FileSystem.makeDirectoryAsync(cacheDirectory);
    } else {
      console.log('Directory exists ', dirInfo);
    }

    console.log('checking the cache ', cacheLocation);
    const {exists, uri: localUri} = await FileSystem.getInfoAsync(
      cacheLocation,
    );

    // if the video is already downloaded, return local path
    if (exists) {
      // file:// storage/cache/video/
      console.log('video is already in cache');
      return localUri;
    }
    // let's download the video
    console.log('downloading the video');
    FileSystem.downloadAsync(uri, cacheLocation);
    return uri;
  } catch (err) {
    console.error(`Cache video error: ${err}`);
    return uri;
  }
}

export default cache;
