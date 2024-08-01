import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { LinkIcon } from "lucide-react";
import { LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UrlState } from "@/context";
import useFetch from "@/hooks/use-fetch";
import { logout } from "@/db/apiAuth";
import { BarLoader } from "react-spinners";
function Header() {
    const navigate = useNavigate();
  const { loading, fn: fnLogout } = useFetch(logout);
  const { user, fetchUser } = UrlState();
  return (
    <>
      <nav className="py-4 flex justify-between items-center">
        <Link to="/">
          <img src="/logo.png" className="h-16" alt="Shortify Logo" />
        </Link>
        <div>
          {!user ? (
            <Link to="/auth">
              <Button>Login</Button>
            </Link>
          ) : (
            <DropdownMenu className="cursor-pointer">
              <DropdownMenuTrigger className="w-10 rounded-full overflow-hidden cursor-pointer ">
                <Avatar >
                  <AvatarImage src= {user?.user_metadata?.profile_pic} className = " object-contain" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="cursor-pointer">
                <DropdownMenuLabel>Md Samsad Alam</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex items-center">
                <Link to="/dashboard" className="flex">
                    <LinkIcon className="mr-2 h-4 w-4" />
                    My Links
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    fnLogout().then(() => {
                      fetchUser();
                      navigate("/auth");
                    });
                  }}
                  className="text-red-400 flex items-center"
                >
                  <LogOut className="mr-2 h-4 w-4"></LogOut>
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </nav>
      {loading && <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />}
    </>
  );
}

export default Header;
