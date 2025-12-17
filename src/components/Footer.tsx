export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-12 mt-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div>
            <h4 className="font-bold text-white mb-4">Igre</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition">Igra 1</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Igra 2</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Igra 3</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Igra 4</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">O nas</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition">Člani skupine</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Namen projektne naloge</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">...</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">...</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Pogosta vprašanja</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition">Ali za uporabo te strani potrebujem pravi denar?</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">?</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">?</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">...</a></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-8"></div>

        {/* Bottom Section */}
        <div className="text-center">
          <p className="text-sm">© 2025 RPO Projektna naloga</p>
        </div>
      </div>
    </footer>
  );
}
