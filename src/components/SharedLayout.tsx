import { Aside, Navbar } from '@/pages/home/component';
import { Outlet } from 'react-router';

function SharedLayout() {
  return (
    <>
      <Navbar />
      <Aside />

      <Outlet />
    </>
  );
}
export default SharedLayout;
