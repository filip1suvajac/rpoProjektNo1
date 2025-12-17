import Footer from './components/Footer';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex justify-center py-8">
        <p className="font-bold text-blue-500">Najboljsi RPO projekt v zgodovini </p>
      </div>
      <div className="flex-grow"></div>
      <Footer />
    </div>
  )
}

export default App;
