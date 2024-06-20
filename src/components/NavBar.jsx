import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMatch, useResolvedPath } from 'react-router-dom';
import "../assets/styles/NavBar.css";
import navBarButton from '../assets/images/navBar.png';

const NavBar = ({ shoppingCart }) => {
  let count = 0;

  for (let item of shoppingCart) {
    count += item.quantity;
  }

  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <div className='navBarOuter'>
      <nav className="navBar">
        <Link to="/" className="storeTitle">
          The Coffee Bean
        </Link>
        <ul id="navBarLinksContainer" className={isNavOpen ? 'active' : ''}>
          <CustomLink to="/">Home</CustomLink>
          <CustomLink to="/shop">Shop</CustomLink>
          <CustomLink to="/cart">Cart ({count})</CustomLink>
        </ul>
      </nav>
      <button id="navBarBtn" onClick={toggleNav}>
        <img src={navBarButton} alt="Expand Navigation Bar Button" id="navBarBtnImage"/>
      </button>
    </div>
  );
};

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props} className="link">
        {children}
      </Link>
    </li>
  );
}

export default NavBar;
