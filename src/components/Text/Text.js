import './Text.css';

export const Title = ({ children }) => {
  return <div className="text-title">{children}</div>;
};

export const NavbarCurrent = ({ children }) => {
  return <div className="navbar-text nav-bold">{children}</div>;
};

export const NavbarDirectory = ({ children }) => {
  return <div className="navbar-text nav-medium">{children}</div>;
};
