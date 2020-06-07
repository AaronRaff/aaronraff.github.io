import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  const links = [
    "https://github.com/aaronraff",
    "https://twitter.com/aaronraff_",
    "https://linkedin.com/in/aaronraff",
    "mailto:aaronraffdev@gmail.com",
  ];
  const icons = [
    <FontAwesomeIcon icon={faGithub} />,
    <FontAwesomeIcon icon={faTwitter} />,
    <FontAwesomeIcon icon={faLinkedin} />,
    <FontAwesomeIcon icon={faEnvelope} />,
  ];

  const elts = icons.map((icon, index) => {
    return (
      <a
        href={links[index]}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mx-4 text-lg"
        title={links[index]}
      >
        {icon}
      </a>
    );
  });

  return <div className="text-center my-16">{elts}</div>;
}
