"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  console.log("data", session);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  return (
    <nav className="d-flex justify-content-between m-4 text-light   ">
      <Link href="/" className="d-flex flex-center">
        <Image src="/next.svg" alt="logo" width={50} height={50} />
      </Link>

      {/* Desktop Navigation */}
      <div className="d-lg-flex d-hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              style={{ borderRadius: "50%" }}
              alt="profile"
            />
            <Link href="/profile">
              <span className="btn btn-outline-dark mx-2">Profile</span>
            </Link>

            <button
              type="button"
              onClick={signOut}
              className="btn btn-outline-dark mx-2"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className="btn btn-outline-dark"
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      {/* <div className="d-hidden d-md-hidden d-lg-hidden relative">
        {session?.user ? (
          <div className="d-flex">
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              className="rounded"
              alt="profile"
              onClick={() => setToggleDropdown(!toggleDropdown)}
            />

            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className="mt-5 w-100 btn-dark btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className="black_btn"
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div> */}
    </nav>
  );
};

export default Nav;
