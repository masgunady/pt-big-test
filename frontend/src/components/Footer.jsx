import { Link } from "react-router-dom";
import {
  AiOutlineInstagram,
  AiFillFacebook,
  AiFillYoutube,
  AiOutlineTwitter,
} from "react-icons/ai";

function Footer() {
  return (
    <footer className="border-t-2 border-slate-100 bg-white w-[100%] min-h-[100px] flex flex-col items-start md:items-center justify-start md:justify-center px-9 md:px-11 xl:px-60 2xl:px-60">
      <div className="w-[100%] text-primary">2023 &copy;</div>
    </footer>
  );
}

export default Footer;
