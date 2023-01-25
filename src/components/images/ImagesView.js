import { useEffect, useState } from "react";
import { getFiles, getList } from "../../services/operations";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { Box, Card, CardActionArea, ImageList, ImageListItem } from '@mui/material';

export const ImagesView = () => {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [images, setImages] = useState([]);

    useEffect( () => {
      createFiles();
    }, [])

    const createFiles = async () => {
      try {
        const files = await getList();
        files.map(name => getFiles({ name: name}).then(res => setImages(prev => [...prev, res])))
      } catch (error) {
        console.log(error.message);
      }
    }
  
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <ImageList variant="masonry" cols={3} gap={8}>
          {images.map((image, i) => (
            <Card sx={{ maxWidth: 345 }} key={i}>
              <CardActionArea onClick={() => setIsOpen(true)}>
                <ImageListItem>
                  <img src={image} alt={image} loading="lazy" />
                </ImageListItem>
              </CardActionArea>
            </Card>
          ))}
        </ImageList>
      </Box>
      {isOpen && (
        <Lightbox
          mainSrc={images[photoIndex]}
          nextSrc={images[(photoIndex + 1) % images.length]}
          prevSrc={images[(photoIndex + images.length - 1) % images.length]}
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() =>
            setPhotoIndex((prev) => (prev + images.length - 1) % images.length)
          }
          onMoveNextRequest={() =>
            setPhotoIndex((prev) => (prev + 1) % images.length)
          }
        />
      )}
    </>
  );
}