import './Text.css';

export const Title = ({ children, style, className }) => {
  return (
    <div className={`text-title ${className}`} style={style}>
      {children}
    </div>
  );
};

export const TableDate = ({ children, style, className }) => {
  return (
    <div className={`table-date ${className}`} style={style}>
      {children}
    </div>
  );
};
export const NavbarCurrent = ({ children, style, className }) => {
  return (
    <div className={`navbar-text nav-bold ${className}`} style={style}>
      {children}
    </div>
  );
};

export const NavbarDirectory = ({ children, style, className }) => {
  return (
    <div className={`navbar-text nav-medium ${className}`} style={style}>
      {children}
    </div>
  );
};

export const IntroTitle = ({ children, style, className }) => {
  return (
    <div className={`intro-title ${className}`} style={style}>
      {children}
    </div>
  );
};

export const TextboxLabel = ({ children, style, className }) => {
  return (
    <div className={`textbox-label ${className}`} style={style}>
      {children}
    </div>
  );
};
