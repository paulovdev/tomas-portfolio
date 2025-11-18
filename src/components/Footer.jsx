const Footer = () => {
  return (
    <footer className="relative p-4 w-full border-t border-p/10 grid grid-cols-4 max-md:flex max-md:justify-between max-lg:items-end max-lg:gap-8">
      {/* DESKTOP */}
      <div className="w-full max-lg:w-1/2 max-md:hidden">
        <p className="text-p text-[.9em]  max-lg:text-[.93em]   font-normal tracking-[-0.05em] truncate">
          © T—ML {new Date().getFullYear()}
        </p>
      </div>

      <div className="w-full flex flex-col col-start-3 max-lg:col-start-2 max-lg:col-span-2 max-md:hidden">
        <p className="text-p  text-[.9em]  max-lg:text-[.93em]   font-normal tracking-[-0.03em] ml-1">
          Las Palmas de Gran Canaria, Spain
        </p>
        <div className="flex items-center ">
          <a
            href="https://www.instagram.com/im_tomasml/"
            target="_blank"
            className="text-p  text-[.9em]  max-lg:text-[.93em]   font-normal tracking-[-0.03em] ml-1 hover:underline"
          >
            Instagram,
          </a>
          <a
            href="https://www.linkedin.com/in/tomasmedinaleon/"
            target="_blank"
            className="text-p  text-[.9em]  max-lg:text-[.93em]   font-normal tracking-[-0.03em] ml-1 hover:underline"
          >
            Linkedin,
          </a>
          <a
            href="https://www.behance.net/tomasml"
            target="_blank"
            className="text-p  text-[.9em]  max-lg:text-[.93em]   font-normal tracking-[-0.03em] ml-1 hover:underline"
          >
            Behance
          </a>
        </div>
      </div>
      <div className="flex flex-col col-start-4 max-md:hidden">
        <a
          href="mailto:hey@tomasml.com"
          className="text-p  text-[.9em]  max-lg:text-[.93em]     font-normal tracking-[-0.03em] ml-1 hover:underline"
        >
          hey@tomasml.com
        </a>
        <a
          href="tel:+34625551094"
          className="text-p  text-[.9em]  max-lg:text-[.93em]     font-normal tracking-[-0.03em] ml-1 hover:underline"
        >
          +(34) 625 551 094
        </a>
      </div>

      {/* MOBILE */}
      <div className="w-full flex-col items-start max-md:flex hidden">
        <div className="flex flex-col">
          <p className="text-p  text-[.9em]  max-lg:text-[.93em]   font-normal tracking-[-0.03em] ml-1">
            Las Palmas de Gran Canaria, Spain
          </p>

          <div className="flex items-center ">
            <a
              href="https://www.instagram.com/im_tomasml/"
              target="_blank"
              className="text-p  text-[.9em]  max-lg:text-[.93em]   font-normal tracking-[-0.03em] ml-1 hover:underline"
            >
              Instagram,
            </a>
            <a
              href="https://www.linkedin.com/in/tomasmedinaleon/"
              target="_blank"
              className="text-p  text-[.9em]  max-lg:text-[.93em]   font-normal tracking-[-0.03em] ml-1 hover:underline"
            >
              Linkedin,
            </a>
            <a
              href="https://www.behance.net/tomasml"
              target="_blank"
              className="text-p  text-[.9em]  max-lg:text-[.93em]   font-normal tracking-[-0.03em] ml-1 hover:underline"
            >
              Behance
            </a>
          </div>
        </div>
        <div className="flex flex-col">
          <a
            href=""
            className="text-p  text-[.9em]  max-lg:text-[.93em]   font-normal tracking-[-0.03em] ml-1 hover:underline"
          >
            hey@tomasml.com
          </a>
          <a
            href=""
            className="text-p  text-[.9em]  max-lg:text-[.93em]   font-normal tracking-[-0.03em] ml-1 hover:underline"
          >
            +(34) 625 551 094
          </a>
        </div>
      </div>
      <div className="w-1/3 max-md:flex items-end justify-end hidden">
        <p className="text-p text-[.9em]  max-lg:text-[.93em]   font-normal tracking-[-0.05em] truncate">
          © T—ML {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
