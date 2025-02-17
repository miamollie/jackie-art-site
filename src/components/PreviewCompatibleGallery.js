import React from "react";
import Gallery from "@browniebroke/gatsby-image-gallery";
// import "@browniebroke/gatsby-image-gallery/dist/style.css";

const PreviewCompatibleGallery = ({ images }) => {


  const gallery = images.map((i) => i.image.childImageSharp);
  return <Gallery className="gallery" images={gallery} />;

  // if (images.every((a) => typeof a == "string")) {
  //   return images.map((i) => (
  //     <img
  //       style={{ height: "150px", width: "150px", margin: "2rem" }}
  //       src={i}
  //     />
  //   ));
  // }

  return null;
};

export default PreviewCompatibleGallery;
