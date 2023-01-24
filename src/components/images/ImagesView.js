import { useEffect, useState } from "react";
import { getFiles } from "../../services/operations";

export const ImagesView = () => {
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState([]);

  useEffect(() => {
    getFiles().then((res) => setImages(prev=>[...prev, res]));
  }, [])
  
  return (
    <div>
      <img id="image" alt="good"></img>
    </div>
  );
}