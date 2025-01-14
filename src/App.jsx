import CVForm from "./CVForm.jsx";
import CVPreview from "./CVPreview.jsx";
import StatsChart from "./StatsChart.jsx";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold pt-8 pb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
            Portfolio Manager
          </h1>
          <p className="text-xl text-gray-400">Gestiona tu carrera profesional con facilidad</p>
        </header>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700 transition-all duration-300 hover:shadow-xl hover:border-gray-600">
            <h2 className="text-3xl font-semibold mb-6 text-blue-400">Actualizar CV</h2>
            <CVForm />
          </div>

          <div className="bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700 transition-all duration-300 hover:shadow-xl hover:border-gray-600">
            <h2 className="text-3xl font-semibold mb-6 text-blue-400">Vista Previa del CV</h2>
            <CVPreview />
          </div>
        </div>

        <div className="bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700 mt-8 transition-all duration-300 hover:shadow-xl hover:border-gray-600">
          <h2 className="text-3xl font-semibold mb-6 text-center text-blue-400">
            Estadísticas del CV
          </h2>
          <StatsChart />
        </div>
      </div>
    </div>
  );
}

export default App;
