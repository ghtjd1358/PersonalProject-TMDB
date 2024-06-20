import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import MovieListPage from './page/MovieListPage';
import MovieDetailPage from './page/MoviesDetailPage';

function App() {
  return (
    <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<MovieListPage />} />
          <Route path="/movie/:id" element={<MovieDetailPage />} />
        </Route>
    </Routes>
  );
}

export default App;



