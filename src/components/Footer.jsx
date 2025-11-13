const Footer = () => {
  return (
    <footer className="relative p-4 w-full flex items-center justify-between">
      <div className="w-full ">
        <p className="text-p text-[1em] font-semibold tracking-[-0.03em]">
          © BOTH
        </p>
      </div>
      <div className="w-full flex items-center">
        <p className="text-p text-[1em] font-semibold tracking-[-0.03em] ml-1">
          235A Abbotsford Street, North Melbourne VIC 3051
        </p>
        ,
        <a
          href=""
          className="text-p text-[1em] font-semibold tracking-[-0.03em] ml-1"
        >
          hi@both.studio
        </a>
        ,
        <a
          href=""
          className="text-p text-[1em] font-semibold tracking-[-0.03em] ml-1"
        >
          +61 432 089 212
        </a>
        ,
        <a
          href=""
          className="text-p text-[1em] font-semibold tracking-[-0.03em] ml-1"
        >
          Instagram
        </a>
        ,
        <a
          href=""
          className="text-p text-[1em] font-semibold tracking-[-0.03em] ml-1"
        >
          Newsletter
        </a>
      </div>
    </footer>
  );
};

export default Footer;
