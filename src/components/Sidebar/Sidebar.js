import { GoHomeFill } from "react-icons/go";
import { FaSearch } from "react-icons/fa";
import { IoCreateOutline } from "react-icons/io5";
import { FaHeartbeat } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { CiMenuFries } from "react-icons/ci";
import MelodiQLogo from '../../assets/MelodiQLogo.png';
const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">
        <img src={MelodiQLogo} alt="Logo" />
      </div>
      <div className="Menu-bar">
        <GoHomeFill />
        <FaSearch />
        <IoCreateOutline />
        <FaHeartbeat />
        <FaUser />
        <IoMdSettings />
      </div>
      <div className="Profile-details">
      <CiMenuFries />
      </div>
    </div>
  );
};

export default Sidebar;
