import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <div className="overflow-hidden">
      <div className="overflow-hidden">
        {/* Desktop Menu  */}
        <nav className="sm:flex hidden items-center justify-center pt-[3.046875vw] w-[100%]">
          <div className="w-[2.3828125vw] h-[1.5234375vw]  mx-[auto]">
            <Link href="/">
              <Image
                src="/Premium.png"
                priority
                className="image z-50"
                fill={true}
                alt="logo"
              />
            </Link>
          </div>
        </nav>

        {/* Mobile Menu  */}
        <nav>
          <div
            className={`sm:hidden flex items-center justify-between my-[5.4vw]`}
          >
            <div
              className={` w-[42px] h-[27px] flex items-center mx-[auto] `}
            >
              <Link href="/">
                <Image
                  src="/Premium.png"
                  priority
                  className="image z-30  fixed"
                  fill={true}
                  alt="logo"
                />
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;