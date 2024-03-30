import { twJoin } from "tailwind-merge";
import { useCelo } from "@celo/react-celo";
import Link from "next/link";

const Navbar = () => {
  const { connect, address } = useCelo();

  return (
    <nav
      className={twJoin(
        "z-10 flex items-center justify-center rounded-xl transition-all",
        "w-full",
        "backdrop-blur-sm dark:bg-[#0b14374d] md:top-4 xl:top-[20px]"
      )}
    >
      <div className="shadow-shadow-500 dark:!bg-navy-800 relative flex h-[61px] w-full max-w-[420px] items-center justify-between gap-3 rounded-full bg-white p-2 shadow-xl dark:shadow-none">
        <Link href="/">Home</Link>

        <div>{address ? <div>Connected to {address}</div> : <button onClick={connect}>Connect wallet</button>}</div>
      </div>
    </nav>
  );
};

export default Navbar;
