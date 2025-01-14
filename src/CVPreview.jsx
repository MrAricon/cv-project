import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";

const CVPreview = () => {
  const [cvData, setCvData] = useState(null);

  const fetchCVData = async () => {
    try {
      const response = await fetch("http://172.17.22.165/cv_site/api.php");
      const data = await response.json();
      setCvData(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchCVData();
  }, []);

  const generatePDF = () => {
    if (!cvData) return;

    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Curriculum Vitae", 105, 15, null, null, "center");
    
    doc.setFontSize(12);
    doc.text(`Nombre: ${cvData.name}`, 20, 30);
    doc.text(`Profesión: ${cvData.profession}`, 20, 40);
    doc.text(`Correo Electrónico: ${cvData.email}`, 20, 50);
    
    doc.setFontSize(14);
    doc.text("Experiencia:", 20, 65);
    doc.setFontSize(12);
    
    const splitExperience = doc.splitTextToSize(cvData.experience, 170);
    doc.text(splitExperience, 20, 75);

    doc.save("cv.pdf");
  };

  if (!cvData) {
    return <p className="text-gray-400 text-center">Cargando datos del CV...</p>;
  }

  return (
    <div className="bg-gray-700 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-blue-400">Currículum Vitae</h2>
      <div className="space-y-3">
        <p><span className="font-semibold text-gray-300">Nombre:</span> <span className="text-white">{cvData.name}</span></p>
        <p><span className="font-semibold text-gray-300">Profesión:</span> <span className="text-white">{cvData.profession}</span></p>
        <p><span className="font-semibold text-gray-300">Correo Electrónico:</span> <span className="text-white">{cvData.email}</span></p>
        <p><span className="font-semibold text-gray-300">Experiencia:</span> <span className="text-white">{cvData.experience}</span></p>
      </div>
      <button
        onClick={generatePDF}
        className="mt-6 px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-md hover:from-green-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-300 transform hover:scale-105"
      >
        Descargar CV en PDF
      </button>
    </div>
  );
};

export default CVPreview;
