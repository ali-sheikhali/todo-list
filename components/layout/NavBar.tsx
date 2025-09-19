import Link from "next/link";

export default function NavBar() {
  return (
    <div className="w-full text-white bg-[#1F1F21]">
      <div className="w-10/12 mx-auto py-4">
        <Link href="/">Todo list</Link>
      </div>
    </div>
  );
}
