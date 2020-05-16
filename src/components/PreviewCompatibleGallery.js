import React from "react";
import PropTypes from "prop-types";
import Gallery from "@browniebroke/gatsby-image-gallery";
import "@browniebroke/gatsby-image-gallery/dist/style.css";

const PreviewCompatibleGallery = ({ images }) => {
  if (images.every((a) => typeof a == "object")) {
    const full = images.map((i) => i.image.full.fluid.src);
    const thumbs = images.map((i) => i.image.thumb.fluid);
    return (
      <Gallery
        className="gallery"
        images={full}
        thumbs={thumbs}
        imgClass="img-class"
        margin="0.5rem"
      />
    );
  }

  if (images.every((a) => typeof a == "string")) {
    return images.map((i) => (
      <img
        style={{ height: "150px", width: "150px", margin: "2rem" }}
        src={i}
      />
    ));
  }

  return null;
};

PreviewCompatibleGallery.propTypes = {
  imageInfo: PropTypes.shape({
    alt: PropTypes.string,
    childImageSharp: PropTypes.object,
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
    style: PropTypes.object,
  }).isRequired,
};

export default PreviewCompatibleGallery;
