import React from 'react';

export const useImageUploadToS3 = () => {
  const [uploadState, setUploadState] = React.useState<
    'uploaded' | 'failed' | 'in_progress' | undefined
  >();
  const uploadImage = async (imageUri: string, presignedUrl: string) => {
    try {
      // Fetch the image data
      setUploadState('in_progress');
      const response = await fetch(imageUri);
      const imageBlob = await response.blob();
      // Upload the image to S3 using the pre-signed URL
      const uploadResponse = await fetch(presignedUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'image/jpeg', // Change the content type if your image is not a JPEG
        },
        body: imageBlob,
      });
      // Handle the response from S3
      if (uploadResponse.ok) {
        setUploadState('uploaded');
      } else {
        setUploadState('failed');
        console.error(
          'Error uploading image to S3:',
          uploadResponse.status,
          uploadResponse.statusText
        );
      }
    } catch (error) {
      setUploadState('failed');
      console.log('📢 [useImageUpload.ts:34]', error);
    }
  };
  return { uploadImage, uploadState, setUploadState };
};
