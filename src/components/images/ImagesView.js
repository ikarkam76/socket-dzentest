import { useEffect, useState } from "react";
import { getImages } from "../../services/operations";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { Box, Card, CardActionArea, ImageList, ImageListItem } from '@mui/material';

export const ImagesView = () => {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [images, setImages] = useState([]);

  useEffect(() => {
    getImages().then(res => res.result.map(item => setImages(prev => [...prev, item.image])));
  }, [])
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <ImageList variant="masonry" cols={3} gap={8}>
          {images.map((item, i) => (
            <Card sx={{ maxWidth: 345 }} key={i}>
              <CardActionArea
                onClick={() => {
                  setIsOpen(true);
                  setPhotoIndex(i);
                }}
              >
                <ImageListItem>
                  <img
                    src={item}
                    alt={item}
                    loading="lazy"
                    sx={{ height: "240px", width: "320px" }}
                  />
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