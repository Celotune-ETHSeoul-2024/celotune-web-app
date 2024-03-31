import { twJoin } from "tailwind-merge";
import { useCelo } from "@celo/react-celo";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { sliceEthAddress } from "@/utils/sliceAddress";

const Navbar = () => {
  const { connect, address, disconnect } = useCelo();

  return (
    <nav
      className={twJoin(
        "z-10 flex items-center justify-center rounded-xl transition-all",
        "w-full",
        "backdrop-blur-sm dark:bg-[#0b14374d] md:top-4 xl:top-[20px]"
      )}
    >
      <div className="shadow-shadow-500 dark:!bg-navy-800 relative flex h-[61px] w-full max-w-[420px] items-center justify-between gap-3 rounded-full bg-white p-2 shadow-xl dark:shadow-none">
        <Link href="/" className="text-base font-semibold text-gray-800 dark:text-white hover:dark:text-white">
          <Button>Home&nbsp;🏠</Button>
        </Link>

        <div>
          {address ? (
            <div className="flex">
              <Button variant="destructive" className="mr-2" onClick={async () => await disconnect()}>
                Disc.
              </Button>
              <Button disabled>{sliceEthAddress(address)}</Button>
            </div>
          ) : (
            <Button onClick={async () => await connect()}>Connect wallet</Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
