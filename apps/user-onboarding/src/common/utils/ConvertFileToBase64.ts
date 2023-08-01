import RNFetchBlob from 'rn-fetch-blob';

export const convertFileToBase64 = async (imageUrl: string): Promise<string> => {
  let imagePath = imageUrl;
  try {
    const resp = await RNFetchBlob.config({
      fileCache: true,
    }).fetch('GET', imagePath);
    imagePath = resp.path();
    const base64 = await resp.readFile('base64');
    return base64;
  } catch (error) {
    throw new Error('Failed to convert file to base64');
  }
};
