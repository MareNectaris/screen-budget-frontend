import MenuIcon from '@mui/icons-material/Menu';
import { NavbarCurrent, NavbarDirectory } from "../Text/Text";
import "./Navbar.css";
export const Navbar = ({children}) => {
  return (
    <div className="navbar">
      <MenuIcon/>
      <NavbarDirectory>개인 가계부 /</NavbarDirectory><NavbarCurrent>대시보드</NavbarCurrent>
    </div>
  )
}