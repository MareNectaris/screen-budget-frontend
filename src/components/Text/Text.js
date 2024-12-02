import './Text.css';

export const Title = ({ children, style }) => {
  return (
    <div className="text-title" style={style}>
      {children}
    </div>
  );
};

export const NavbarCurrent = ({ children, style }) => {
  return (
    <div className="navbar-text nav-bold" style={style}>
      {children}
    </div>
  );
};

export const NavbarDirectory = ({ children, style }) => {
  return (
    <div className="navbar-text nav-medium" style={style}>
      {children}
    </div>
  );
};

export const IntroTitle = ({ children, style }) => {
  return (
    <div className="intro-title" style={style}>
      {children}
    </div>
  );
};

export const TextboxLabel = ({ children, style }) => {
  return (
    <div className="textbox-label" style={style}>
      {children}
    </div>
  );
};
