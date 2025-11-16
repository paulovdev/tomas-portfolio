import { Link } from "react-router-dom";
import Nav from "../../components/navs/Nav";
import { Helmet } from "react-helmet";

const NotFound = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Portfolio — Tomás • Not Found</title>
        <meta name="description" />
      </Helmet>
      <Nav />
      <div
        className="relative h-svh 
    max-md:h-[calc(var(--vh)*100)] px-4 flex items-center justify-center bg-s"
      >
        <div className="w-full grid grid-cols-4">
          <p className="text-p text-[4em] max-md:text-[3em] font-medium tracking-[-0.03em]">
            404
          </p>
          <div className="flex flex-col items-start col-span-3">
            <p className="text-p text-[.9em] max-lg:text-[.95em] max-md:text-[1em] font-semibold tracking-[-0.03em]">
              Page not found :&#40;
            </p>
            <p className="text-p text-[.9em] max-lg:text-[.95em] max-md:text-[1em] font-semibold tracking-[-0.03em]">
              The page you are looking for does not exist.
            </p>
            <p className="text-p text-[.9em] max-lg:text-[.95em] max-md:text-[1em] font-semibold tracking-[-0.03em]">
              Please check the URL or return to the {" "}
              <Link
                to={"/"}
                className="text-p text-[.9em] max-lg:text-[.95em] max-md:text-[1em] font-semibold tracking-[-0.03em] underline"
              >
                homepage
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
