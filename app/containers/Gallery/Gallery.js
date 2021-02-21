import React from 'react';
import { MDBGallery, MDBGalleryList} from 'mdbreact';

function Gallery() {
  const dataImg = [
    {
      img:
        'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(73).jpg',
      cols: 1,
      title: 'image',
    },
    {
      img:
        'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(72).jpg',
      cols: 1,
      title: 'image',
    },
    {
      img:
        'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(71).jpg',
      cols: 1,
      title: 'image',
    },
    {
      img:
        'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(74).jpg',
      cols: 1,
      title: 'image',
    },
    {
      img:
        'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(75).jpg',
      cols: 1,
      title: 'image',
    },

    {
      img:
        'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(78).jpg',
      cols: 1,
      title: 'image',
    },
    {
      img:
        'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(77).jpg',
      cols: 1,
      title: 'image',
    },
    {
      img:
        'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(79).jpg',
      cols: 1,
      title: 'image',
    }
  ];

  return (
    <>
    <MDBGallery cols={4} spacing={0}>
      {dataImg.map(({ cols, img, title }, i) => {
        return (
          <MDBGalleryList key={i} cols={cols || 1}>
            <img src={img} alt={title} />
          </MDBGalleryList>
        );
      })}
    </MDBGallery>
    <hr />
    <MDBGallery cols={4} spacing={30}>
      {dataImg.map(({ cols, img, title }, i) => {
        return (
          <MDBGalleryList key={i} cols={cols || 1}>
            <img src={img} alt={title} />
          </MDBGalleryList>
        );
      })}
    </MDBGallery>
  </>
  );
}

export default Gallery;