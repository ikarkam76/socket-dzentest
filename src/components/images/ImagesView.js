import { ImageList, ImageListItem } from "@mui/material";
import { useEffect, useState } from "react";
import { getFiles } from "../../services/operations";

export const ImagesView = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    getFiles().then((res) => setImages([res]));
  }, [])
  
  return (
    <>
      <img src={images[0]} alt="foto" />
      {/* <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
        {images.map((item, i) => (
          <ImageListItem key={i}>
            <img
              src={`${item}?w=164&h=164&fit=crop&auto=format`}
              srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              alt="foto"
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList> */}
    </>
  );
}