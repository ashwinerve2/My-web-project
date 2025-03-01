// src/Section.js
import React from 'react';

const Section = ({ id, title, content, backgroundColor }) => {
  return (
    <section id={id} style={{ padding: '20px', margin: '10px 0', backgroundColor: backgroundColor }}>
      <h1>{title}</h1>
      <p>{content}</p>
    </section>
  );
};

export default Section;
