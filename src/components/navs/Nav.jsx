import { Link, useLocation } from "react-router-dom";
import Clock from "./Clock";

const Nav = () => {
  const { pathname } = useLocation();

  const isActive = (href) => {
    if (
      pathname === "/works" ||
      pathname === "/about" ||
      pathname === "/contact"
    ) {
      return pathname === href
        ? "text-s! max-md:text-s/50!"
        : "text-s/50! max-md:text-s!";
    }
    return pathname === href ? "text-s" : "text-s/50";
  };

  return (
    <>
      <nav
        className={`
          fixed top-0 left-0 p-4 py-2 pt-4 w-full
          grid grid-cols-4 items-center mix-blend-difference
          max-md:flex max-md:justify-between max-md:items-center
          z-100
        `}
      >
        {/* LEFT – DESKTOP */}
        <div className="flex content-start justify-start max-md:hidden">
          <Link
            to="/"
            className={` text-[.9em] max-lg:text-[.95em] max-md:text-[1em]  text-s! font-medium tracking-[-0.03em] ${isActive(
              "/"
            )}`}
          >
            T—ML
          </Link>
        </div>

        {/* CENTER – DESKTOP */}
        <div className="flex justify-start gap-1 max-md:hidden">
          <Link
            to="/works"
            className={` text-[.9em] max-lg:text-[.95em] max-md:text-[1em]  font-medium tracking-[-0.03em] ${isActive(
              "/works"
            )}`}
          >
            Work,
          </Link>

          <Link
            to="/about"
            className={` text-[.9em] max-lg:text-[.95em] max-md:text-[1em]  font-medium tracking-[-0.03em] ${isActive(
              "/about"
            )}`}
          >
            About,
          </Link>

          <Link
            to="/contact"
            className={` text-[.9em] max-lg:text-[.95em] max-md:text-[1em]  font-medium tracking-[-0.03em] ${isActive(
              "/contact"
            )}`}
          >
            Contact
          </Link>
        </div>

        {/* MOBILE */}
        <div className="max-md:flex justify-center gap-1 hidden">
          <Link
            to="/"
            className={` text-[.9em] max-lg:text-[.95em] max-md:text-[1em]   text-s font-medium tracking-[-0.03em] truncate
        
      `}
          >
            T—ML,
          </Link>

          <Link
            to="/works"
            className={` text-[.9em] max-lg:text-[.95em] max-md:text-[1em]   font-medium tracking-[-0.03em] ${isActive(
              "/works"
            )}`}
          >
            Work,
          </Link>

          <Link
            to="/about"
            className={` text-[.9em] max-lg:text-[.95em] max-md:text-[1em]  font-medium tracking-[-0.03em] ${isActive(
              "/about"
            )}`}
          >
            About,
          </Link>

          <Link
            to="/contact"
            className={` text-[.9em] max-lg:text-[.95em] max-md:text-[1em]   font-medium tracking-[-0.03em] ${isActive(
              "/contact"
            )}`}
          >
            Contact
          </Link>
        </div>

        {/* CLOCK */}
        <div className="w-full flex justify-end col-span-2 ">
          <span className=" text-[.9em] max-lg:text-[.95em] max-md:text-[1em]  text-s font-semibold tracking-[-0.03em] uppercase flex items-center gap-1">
            <Clock />
          </span>
        </div>
      </nav>
    </>
  );
};

export default Nav;
