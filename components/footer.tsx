import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="flex w-full items-center justify-center border-t-2 border-black p-10">
      <Link href="/">
        <Image src="/next.svg" alt="logo" width={175} height={175} />
      </Link>
    </footer>
  );
};

export default Footer;
