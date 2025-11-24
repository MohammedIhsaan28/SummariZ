'use client';
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({
  href, 
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {

    const pathname = usePathname()
    const isActive = pathname === href || (href !== '/' && pathname.startsWith(href))
  return (
    <Link
      href={href}
      className={cn("transition-colors text-sm text-gray-600 duration-200 hover:text-cyan-500 ",className,isActive && 'text-cyan-500')}
    
      >
      {children}
    </Link>
  );
}
