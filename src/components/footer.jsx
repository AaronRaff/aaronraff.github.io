import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faTwitter,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  const links = [
    "https://github.com/aaronraff",
    "https://twitter.com/aaronraff_",
    "https://linkedin.com/in/aaronraff",
  ];
  const icons = [
    <FontAwesomeIcon icon={faGithub} />,
    <FontAwesomeIcon icon={faTwitter} />,
    <FontAwesomeIcon icon={faLinkedin} />,
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
