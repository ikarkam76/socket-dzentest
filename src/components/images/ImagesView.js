import { useEffect, useState } from "react";
import { getFiles, getList } from "../../services/operations";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Button } from "@mui/material";

export const ImagesView = () => {
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState([]);

    useEffect( () => {
      createFiles();
    }, [])

    const createFiles = async () => {
      try {
        const files = await getList();
        files.map(name => getFiles({ name: name}).then(res => setImages(prev => [...prev, {src: res}])))
      } catch (error) {
        console.log(error.message);
      }
    }
  
  return (
    <>
      <Button
        variant="outlined"
        color="inherit"
        onClick={() => setOpen(true)}
      >
        Images
      </Button>
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={images} />
    </>
  );
}