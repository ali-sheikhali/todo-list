import Link from "next/link";
import Search from "./Search";

export default function NavBar() {
  return (
    <div className="w-full text-white bg-primary">
      <div className="w-11/12 mx-auto flex justify-between items-center py-4">
        <Link href="/">Todo list</Link>
        <div className="w-[200px] sm:w-[300px] md:w-[400px] xl:w-[500px]">
          <Search />
        </div>
      </div>
    </div>
  );
}
