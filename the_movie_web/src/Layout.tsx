import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

export default function Layout() {

  return (
    <>
      <div id='wrap'>
        <main>
          <Header />
          <div className='content relative'>
            <Outlet />
          </div>
        <Footer />
        </main>
      </div>
    </>
  );
}
