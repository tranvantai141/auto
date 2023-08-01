import { useCallback } from 'react';
import { postUploadSupportingDoc } from '../apis/postUploadSupportingDoc';

export function useUploadDocument() {
  const getPreSignUrls = async (transactionId: string, numberOfPages: number) => {
    const response = await postUploadSupportingDoc(transactionId ?? '', numberOfPages);
    if (response.code === 'SUCCESS') {
      return response.presignUrls;
    }
    throw new Error(response.message);
  };

  const uploadDocument = useCallback(async (transactionId: string, imageUrls: string[]) => {
    // get upload urls
    const numberOfPages = imageUrls.length;
    const presignUrls = await getPreSignUrls(transactionId, numberOfPages);
    // upload images, using blob, upload all images in parallel
    const uploadPromises = imageUrls.map(async (imageUrl, index) => {
      const presignUrl = presignUrls[index];
      const imageResponse = await fetch(imageUrl);
      const imageBlob = await imageResponse.blob();
      const uploadResponse = await fetch(presignUrl, {
        method: 'PUT',
        body: imageBlob,
        headers: {
          'Content-Type': 'image/jpeg', // Update with the appropriate content type
        },
      });
      if (!uploadResponse.ok) {
        throw new Error('Upload failed');
      }
    });
    await Promise.all(uploadPromises);
  }, []);

  return {
    uploadDocument,
  };
}
