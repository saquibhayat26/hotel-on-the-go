import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";

const Header = () => {
  const { isLoggedIn } = useAppContext();
  console.log("🚀 ~ file: Header.tsx:6 ~ Header ~ isLoggedIn:", isLoggedIn);
  return (
    <div className="bg-backgroundColor-normal py-6 flex justify-center">
      <div className="container flex justify-between">
        <span className="text-3xl text-textColor-white tracking-tight">
          <Link to={"/"} className="font-bold ">
            Hotelonthego.com
          </Link>
        </span>
        {isLoggedIn ? (
          <>
            <Link to={"/my-bookings"}>My Bookings</Link>
            <Link to={"/my-hotels"}>My Hotels</Link>
            <SignOutButton />
          </>
        ) : (
          <span className="flex space-x-2">
            <Link
              to={"/login"}
              className="text-textColor-inverted px-3 rounded flex items-center font-bold bg-backgroundColor-white hover:bg-backgroundColor-lightGray"
            >
              Sign-In
            </Link>
          </span>
        )}
      </div>
    </div>
  );
};
export default Header;
