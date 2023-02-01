import { useEffect, useState, useCallback } from "react";
import ImageViewer from "react-simple-image-viewer";
import { getImages } from "../../services/operations";
import { Box, Card, CardActionArea, ImageList, ImageListItem } from '@mui/material';

export const ImagesView = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [images, setImages] = useState([]);

  useEffect(() => {
    getImages().then(res => res.result.map(item => setImages(prev => [...prev, item.image])));
  }, [])

  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <ImageList variant="masonry" cols={3} gap={8}>
          {images.map((item, i) => (
            <Card sx={{ maxWidth: 345 }} key={i}>
              <CardActionArea
                onClick={() => {
                  openImageViewer(i);
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
      {isViewerOpen && (
        <ImageViewer
          src={images}
          currentIndex={currentImage}
          disableScroll={false}
          closeOnClickOutside={true}
          onClose={closeImageViewer}
        />
      )}
    </>
  );
}