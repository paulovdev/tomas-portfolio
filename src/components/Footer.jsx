const Footer = () => {
  return (
    <footer className="relative p-4 w-full border-t border-p/10 flex items-start justify-between max-lg:items-end max-lg:gap-8">
      {/* DESKTOP */}
      <div className="w-full max-lg:w-1/3 max-md:hidden">
        <p className="text-p text-[1em] font-semibold tracking-[-0.05em] truncate">
          © T—ML 2025
        </p>
      </div>
      <div className="w-full flex items-center justify-between max-md:hidden">
        <div className="flex flex-col">
          <p className="text-p text-[1em] font-semibold tracking-[-0.03em] ml-1">
            Las Palmas de Gran Canaria, Spain
          </p>

          <a
            href=""
            className="text-p text-[1em] font-semibold tracking-[-0.03em] ml-1"
          >
            Instagram, Linkedin, Behance
          </a>
        </div>
        <div className="flex flex-col">
          <a
            href=""
            className="text-p text-[1em] font-semibold tracking-[-0.03em] ml-1"
          >
            hey@tomasml.com
          </a>
          <a
            href=""
            className="text-p text-[1em] font-semibold tracking-[-0.03em] ml-1"
          >
            +(34) 625 551 094
          </a>
        </div>
      </div>
      {/* MOBILE */}

      <div className="w-full flex-col items-start max-md:flex hidden">
        <div className="flex flex-col">
          <p className="text-p text-[1em] font-semibold tracking-[-0.03em] ml-1">
            Las Palmas de Gran Canaria, Spain
          </p>

          <a
            href=""
            className="text-p text-[1em] font-semibold tracking-[-0.03em] ml-1"
          >
            Instagram, Linkedin, Behance
          </a>
        </div>
        <div className="flex flex-col">
          <a
            href=""
            className="text-p text-[1em] font-semibold tracking-[-0.03em] ml-1"
          >
            hey@tomasml.com
          </a>
          <a
            href=""
            className="text-p text-[1em] font-semibold tracking-[-0.03em] ml-1"
          >
            +(34) 625 551 094
          </a>
        </div>
      </div>
      <div className="w-1/3 max-md:flex items-end justify-end hidden">
        <p className="text-p text-[1em] font-semibold tracking-[-0.05em] truncate">
          © T—ML 2025
        </p>
      </div>
    </footer>
  );
};

export default Footer;
