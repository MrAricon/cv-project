import React, { useState } from "react";

const CVForm = ({ onUpdate }) => {
  const [formData, setFormData] = useState({
    name: "",
    profession: "",
    email: "",
    experience: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://paucano.ddns.net/cv_site/api.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (result.success) {
        onUpdate();
        alert("CV actualizado con éxito");
      } else {
        alert("Error al actualizar el CV");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Nombre</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
          placeholder="Ingrese su nombre completo"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Profesión</label>
        <input
          type="text"
          name="profession"
          value={formData.profession}
          onChange={handleChange}
          className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
          placeholder="Ej: Desarrollador Web"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Correo Electrónico</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
          placeholder="correo@ejemplo.com"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Experiencia</label>
        <textarea
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 h-32 resize-none"
          placeholder="Describa su experiencia profesional"
        />
      </div>
      <button
        type="submit"
        className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-md hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-300 transform hover:scale-105"
      >
        Actualizar CV
      </button>
    </form>
  );
};

export default CVForm;
