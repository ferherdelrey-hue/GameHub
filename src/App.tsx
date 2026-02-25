import { useState, useMemo } from 'react';
import { Search, X, Play, Gamepad2, Info, Maximize2, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GAMES } from './constants';
import { Game } from './types';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const filteredGames = useMemo(() => {
    return GAMES.filter(game => 
      game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleGameClick = (game: Game) => {
    setSelectedGame(game);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeGame = () => {
    setSelectedGame(null);
    setIsFullScreen(false);
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white font-sans selection:bg-emerald-500 selection:text-white">
      {/* Navigation / Header */}
      <header className="sticky top-0 z-40 bg-[#1a1a1a]/80 backdrop-blur-md border-b border-white/10 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={closeGame}
          >
            <div className="bg-emerald-500 p-2 rounded-xl group-hover:rotate-12 transition-transform">
              <Gamepad2 size={24} className="text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight hidden sm:block">GameHub</h1>
          </div>

          <div className="flex-1 max-w-xl relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
            <input
              type="text"
              placeholder="Buscar juegos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all placeholder:text-white/20"
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="hidden md:flex items-center gap-2 text-sm font-medium text-white/60 hover:text-white transition-colors">
              <Info size={18} />
              <span>Acerca de</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {selectedGame ? (
            <motion.div
              key="player"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col gap-6"
            >
              <div className="flex items-center justify-between">
                <button 
                  onClick={closeGame}
                  className="flex items-center gap-2 text-white/60 hover:text-white transition-colors group"
                >
                  <ChevronLeft className="group-hover:-translate-x-1 transition-transform" />
                  <span>Volver al catálogo</span>
                </button>
                <div className="flex items-center gap-4">
                  <h2 className="text-2xl font-bold">{selectedGame.title}</h2>
                  <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-bold uppercase tracking-wider">
                    {selectedGame.category}
                  </span>
                </div>
                <button 
                  onClick={() => setIsFullScreen(!isFullScreen)}
                  className="p-2 bg-white/5 hover:bg-white/10 rounded-xl transition-colors"
                  title="Pantalla completa"
                >
                  <Maximize2 size={20} />
                </button>
              </div>

              <div className={`relative aspect-video w-full bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/10 ${isFullScreen ? 'fixed inset-0 z-50 aspect-auto rounded-none' : ''}`}>
                {isFullScreen && (
                  <button 
                    onClick={() => setIsFullScreen(false)}
                    className="absolute top-6 right-6 z-[60] p-3 bg-black/50 hover:bg-black/80 backdrop-blur-md rounded-full text-white transition-all shadow-xl"
                  >
                    <X size={24} />
                  </button>
                )}
                <iframe
                  src={selectedGame.url}
                  className="w-full h-full border-none"
                  allow="fullscreen; autoplay; encrypted-media"
                  title={selectedGame.title}
                />
              </div>

              {!isFullScreen && (
                <div className="bg-white/5 p-8 rounded-3xl border border-white/10">
                  <h3 className="text-xl font-bold mb-4">Descripción</h3>
                  <p className="text-white/60 leading-relaxed">
                    {selectedGame.description}
                  </p>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight mb-2">
                    {searchQuery ? `Resultados para "${searchQuery}"` : 'Juegos Destacados'}
                  </h2>
                  <p className="text-white/40">Descubre los mejores juegos web gratuitos.</p>
                </div>
                <div className="text-right hidden sm:block">
                  <span className="text-4xl font-bold text-emerald-500">{filteredGames.length}</span>
                  <p className="text-xs text-white/40 uppercase tracking-widest font-bold">Juegos disponibles</p>
                </div>
              </div>

              {filteredGames.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredGames.map((game, index) => (
                    <motion.div
                      key={game.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ y: -8 }}
                      onClick={() => handleGameClick(game)}
                      className="group relative bg-white/5 rounded-[2rem] overflow-hidden border border-white/10 cursor-pointer hover:border-emerald-500/50 transition-all shadow-lg hover:shadow-emerald-500/10"
                    >
                      <div className="aspect-[4/3] overflow-hidden relative">
                        <img
                          src={game.thumbnail}
                          alt={game.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <div className="bg-emerald-500 p-4 rounded-full shadow-xl transform scale-50 group-hover:scale-100 transition-transform duration-300">
                            <Play fill="white" size={24} />
                          </div>
                        </div>
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-black/50 backdrop-blur-md text-white/90 rounded-full text-[10px] font-bold uppercase tracking-wider border border-white/10">
                            {game.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-bold mb-1 group-hover:text-emerald-400 transition-colors">{game.title}</h3>
                        <p className="text-white/40 text-sm line-clamp-1">{game.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="bg-white/5 p-6 rounded-full mb-6">
                    <Search size={48} className="text-white/20" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">No se encontraron juegos</h3>
                  <p className="text-white/40">Intenta buscar con otros términos o categorías.</p>
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="mt-6 px-6 py-2 bg-emerald-500 hover:bg-emerald-600 rounded-xl font-bold transition-colors"
                  >
                    Ver todos los juegos
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="border-top border-white/10 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            <div className="bg-white/10 p-2 rounded-xl">
              <Gamepad2 size={20} className="text-white/60" />
            </div>
            <span className="font-bold text-white/60">GameHub</span>
          </div>
          <p className="text-white/20 text-sm">
            &copy; {new Date().getFullYear()} GameHub. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-white/40 hover:text-white transition-colors text-sm">Privacidad</a>
            <a href="#" className="text-white/40 hover:text-white transition-colors text-sm">Términos</a>
            <a href="#" className="text-white/40 hover:text-white transition-colors text-sm">Contacto</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
