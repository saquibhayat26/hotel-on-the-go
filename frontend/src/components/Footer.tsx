import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-backgroundColor-normal py-10 flex justify-center">
      <div className="container mx-auto flex justify-between items-center">
        <span className="text-3xl text-textColor-white">
          <Link to={"/"} className="font-bold tracking-tight">
            Hotelonthego.com
          </Link>
        </span>
        <span className="flex text-textColor-white font-bold tracking-tight gap-4">
          <p>
            <Link to={""} className="cursor-pointer">
              Privacy Policy
            </Link>
          </p>
          <p>
            <Link to={""} className="cursor-pointer">
              Terms of Service
            </Link>
          </p>
        </span>
      </div>
    </div>
  );
};
export default Footer;
