import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";

const CVPreview = ({ updateTrigger }) => {
  const [cvData, setcvData] = useState([]); // Initialize as an empty array

  const fetchcvData = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token not found in localStorage");
      return;
    }
  
    try {
      const response = await fetch("http://paucano.ddns.net/cv_site/api.php", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        console.error(`Error: ${response.status} - ${response.statusText}`);
        return;
      }
  
      const data = await response.json();
      setcvData(data.cv_info); // Assuming the response contains 'cv_info' as an array
    } catch (error) {
      console.error("Error fetching CV data:", error);
    }
  };
  
  useEffect(() => {
    fetchcvData();
  }, [updateTrigger]);

  const generatePDF = () => {
    if (!cvData || cvData.length === 0) return;

    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Curriculum Vitae", 105, 15, null, null, "center");
  
    doc.setFontSize(12);
    doc.text(`Nombre: ${cvData[0].name || 'No disponible'}`, 20, 30);
    doc.text(`Profesión: ${cvData[0].profession || 'No disponible'}`, 20, 40);
    doc.text(`Correo Electrónico: ${cvData[0].email || 'No disponible'}`, 20, 50);
  
    doc.setFontSize(14);
    doc.text("Experiencia:", 20, 65);
    doc.setFontSize(12);
  
    const experience = cvData[0].experience || 'No disponible';
    const splitExperience = doc.splitTextToSize(experience, 170);
    doc.text(splitExperience, 20, 75);

    doc.save("cv.pdf");
  };

  if (!cvData || cvData.length === 0) {
    return <p className="text-gray-400 text-center">Cargando datos del CV...</p>;
  }

  return (
    <div className="bg-gray-700 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-blue-400">Currículum Vitae</h2>
      <div className="space-y-3">
        <p><span className="font-semibold text-gray-300">Nombre:</span> <span className="font-semibold text-gray-300">{cvData[0].name || 'No disponible'}</span></p>
        <p><span className="font-semibold text-gray-300">Profesión:</span> <span className="font-semibold text-gray-300">{cvData[0].profession || 'No disponible'}</span></p>
        <p><span className="font-semibold text-gray-300">Correo Electrónico:</span> <span className="font-semibold text-gray-300">{cvData[0].email || 'No disponible'}</span></p>
        <p><span className="font-semibold text-gray-300">Experiencia:</span> <span className="font-semibold text-gray-300">{cvData[0].experience || 'No disponible'}</span></p>
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
