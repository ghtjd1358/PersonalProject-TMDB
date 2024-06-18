// src/App.tsx
// import Footer from './components/Footer';
import Header from './components/Header';
import MoviesList from './components/moviesList';
import SearchBar from './components/SearchBar';
import Filter from './components/Filter'


function App() {
  return (
    <div className="App">
      <Header />
      <SearchBar />
      {/* <Filter/> */}
      <MoviesList />
      {/* <Footer /> */}
    </div>
  );
}

export default App;
