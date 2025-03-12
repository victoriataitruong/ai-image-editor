import React, { useEffect } from 'react';
import * as bodyPix from '@tensorflow-models/body-pix';
import '@tensorflow/tfjs';

const AIEnhancer = ({ image, onProcessedImage }) => {
  useEffect(() => {
    const removeBackground = async () => {
      const imageElement = new Image();
      imageElement.src = image;
      await imageElement.decode();

      const net = await bodyPix.load();
      const segmentation = await net.segmentPerson(imageElement);

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = imageElement.width;
      canvas.height = imageElement.height;

      ctx.drawImage(imageElement, 0, 0);
      ctx.globalCompositeOperation = 'source-in';
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      onProcessedImage(canvas.toDataURL());
    };

    if (image) {
      removeBackground();
    }
  }, [image, onProcessedImage]);

  return <div>Processing Background Removal...</div>;
};

export default AIEnhancer;
