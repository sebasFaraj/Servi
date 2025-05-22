import { MAX_FILE_SIZE } from '../constants';

export const validateImageFile = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (file.size > MAX_FILE_SIZE) {
      reject(new Error('Image size should be less than 5MB'));
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result as string);
    };
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    reader.readAsDataURL(file);
  });
};