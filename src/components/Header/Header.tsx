'use client';

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
    {href: '/popular', label: 'Popular'},
    {href: '/top-rated', label: 'Top rated'},
    {href: '/now-playing', label: 'Now playing'},
    {href: '/my-favs', label: 'My favorites'}
];

const Header = () => {
  const pathname = usePathname();

  return (
    <header className="w-full py-3 border-b-3 border-purple-600">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between px-4 py-3 space-y-4 sm:space-y-0">
        <Link href={"/"} className="text-3xl sm:text-4xl font-bold text-gray-900 hover:scale-103 transition duration-300"> 
          FilmVault
        </Link>

        <nav className="flex flex-wrap justify-center gap-3 sm:gap-6">
          {links.map(({ href, label }) => (
            <Link key={href} href={href} className={clsx(
              "text-base sm:text-lg font-medium transition duration-300 hover:-translate-y-1",
              pathname === href ? "text-purple-700" : "text-gray-800"
            )}>
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
};

export default Header;