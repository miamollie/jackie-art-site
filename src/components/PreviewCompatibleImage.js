import React from "react";
import PropTypes from "prop-types";
import { GatsbyImage as Img } from "gatsby-plugin-image";

const PreviewCompatibleImage = ({ imageInfo, className }) => {
  const { alt = "", childImageSharp, image } = imageInfo;
  if (!!image && !!image.childImageSharp) {
    return (
      <Img
        className={className}
        image={image.childImageSharp.gatsbyImageData}
        alt={alt}
      />
    );
  } else if (!!childImageSharp) {
    return (
      <Img
        image={childImageSharp.gatsbyImageData}
        // style={imageStyle}
        alt={alt}
      />
    );
    // for Netlify CMS
  } else if (!!image && typeof image === "string") {
    return <img className={className} src={image} alt={alt} />;
  } else {
    return null;
  }
};

PreviewCompatibleImage.propTypes = {
  imageInfo: PropTypes.shape({
    alt: PropTypes.string,
    childImageSharp: PropTypes.object,
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
    style: PropTypes.object,
  }).isRequired,
};

export default PreviewCompatibleImage;
