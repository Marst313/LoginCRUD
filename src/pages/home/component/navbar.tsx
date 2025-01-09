import logo from '@/assets/images/aksamedia-logo-2.webp';
import { useAuthContext } from '@/hooks/useAuthContext';
import { useUserContext } from '@/hooks/useUserContext';
import { useRef, useEffect } from 'react';
import { Link } from 'react-router';

function Navbar() {
  const { toggleSidebar, toggleDropdown, openDropdown, handleCloseDropdown } = useUserContext();
  const { logout, user } = useAuthContext();

  const dropdownRef = useRef<null | HTMLDivElement>(null);

  function handleClickOutside(event: MouseEvent): void {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      handleCloseDropdown();
    }
  }

  function handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      handleCloseDropdown();
    }
  }

  useEffect(function () {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  return (
    <nav>
      <div>
        <div className="flex items-center justify-between">
          {/* LEFT SIDE */}
          <div className="container__nav-left">
            <button
              type="button"
              className="hamburger-button"
              onClick={(event) => {
                event.stopPropagation();
                toggleSidebar();
              }}
            >
              <span className="sr-only">Open sidebar</span>
              <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                />
              </svg>
            </button>
            <a href="https://aksamedia.co.id/" className="logo" target="_blank" rel="noreferrer">
              <img src={logo} alt="Aksamedia Logo" />
            </a>
          </div>
          {/* LEFT SIDE */}

          {/* RIGHT SIDE */}
          <div className="container__nav-right">
            <div>
              <button type="button" className="flex items-center" onClick={toggleDropdown}>
                <div className="profile">
                  <span className="sr-only">Open user menu</span>
                  <img src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="user photo" />
                </div>
                <h1 className="user-name">{user?.username}</h1>
              </button>

              {/* DROP DOWN */}
              <div ref={dropdownRef} className={`${openDropdown ? 'block' : 'hidden'} dropdown__modal`}>
                <div className="profile__dropdown">
                  <p>{user?.username}</p>
                  <p>{user?.email}</p>
                </div>

                {/* LIST DROP DOWN */}
                <ul>
                  <li>
                    <Link to="/">Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/settings">Settings</Link>
                  </li>
                  <li>
                    <button type="button" onClick={logout}>
                      Sign out
                    </button>
                  </li>
                </ul>
                {/* LIST DROP DOWN */}
              </div>
              {/* DROP DOWN */}
            </div>
          </div>
          {/* RIGHT SIDE */}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
