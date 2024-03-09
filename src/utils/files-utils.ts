export const getDataUrl = (file: File) => {
  return new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target) {
        resolve(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  });
};
