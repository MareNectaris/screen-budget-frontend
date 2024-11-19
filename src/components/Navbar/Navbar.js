import MenuIcon from '@mui/icons-material/Menu';
import { NavbarCurrent, NavbarDirectory } from "../Text/Text";
import "./Navbar.css";
export const Navbar = ({children, isSidebarOpen, setIsSidebarOpen}) => {
  return (
    <div className="navbar">
      { !isSidebarOpen && <MenuIcon style={{cursor: 'pointer', paddingRight: '16px'}} onClick={() => setIsSidebarOpen(!isSidebarOpen)}/>}
      <NavbarDirectory>개인 가계부 /</NavbarDirectory><NavbarCurrent>대시보드</NavbarCurrent>
    </div>
  )
}