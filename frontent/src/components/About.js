import React, { useContext } from 'react';
import noteContext from '../context/Notes/noteContext';
export default function About() {
  const a = useContext(noteContext);
  return <div>
      this is about.js and {a.name}
  </div>;
}
