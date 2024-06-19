import Footer from './components/Footer';
import Header from './components/Header';
import MoviesList from './components/moviesList';
import SearchBar from './components/SearchBar';


function App() {

  return (
    <div className="App">
      <Header />
      <SearchBar />
      <MoviesList />
      <Footer />
    </div>
  );
}

export default App;
