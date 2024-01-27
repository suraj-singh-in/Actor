import { navItem } from "@/lib/constant";
import { cn } from "@/lib/utils";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { usePathname } from "next/navigation";

const SideBar = () => {
  const path = usePathname();

  return (
    <div className="relative hidden h-screen border-r pt-20 md:block w-72">
      {navItem.map((item, itemIndex) => {
        return (
          <Link
            key={item.title}
            href={item.href}
            // onClick={() => {
            //   if (setOpen) setOpen(false);
            // }}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "group relative flex h-12 justify-start",
              path === item.href && "bg-muted font-bold hover:bg-muted"
            )}
          >
            <item.icon className={cn("h-5 w-5", item.color)} />
            <span className={cn("absolute left-12 text-base duration-200")}>
              {item.title}
            </span>
          </Link>
        );
      })}
    </div>
  );
};

export default SideBar;
