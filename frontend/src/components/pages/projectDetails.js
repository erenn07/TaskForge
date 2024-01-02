import React from 'react';
import { useLocation } from 'react-router-dom';

function ProjectDetails() {
  const location = useLocation();
  const projectId = location.state?.projectId;

  return (
    <>
      <div>
        <h1>Proje Detay Sayfası</h1>
        <p>Proje ID: {projectId}</p>
      </div>
    </>
  );
}

export default ProjectDetails;