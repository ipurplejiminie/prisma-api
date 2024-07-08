"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const fetchUsers = async () => {
    const res = await fetch("/api/user");
    console.log(res);
    const users = await res.json();
    console.log(users);
    setUsers(users);
  };

  useEffect(() => {
    console.log(name, email);
  }, [name, email]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const postUser = async () => {
    const res = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email }),
    });

    const user = await res.json();

    fetchUsers();
  };

  const handleClick = () => {
    console.log("Clicked");
    postUser();
  };

  return (
    <div className="container mx-auto">
      <div className=" flex flex-col h-screen items-center justify-center">
        <h1 className="font-bold text-5xl">Home</h1>
        <form className="flex flex-col space-y-3 m-10">
          <input
            onChange={(event) => {
              setName(event.target.value);
            }}
            placeholder="name"
            type="text"
            className="border border-black px-2"
          />
          <input
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            placeholder="email"
            type="text"
            className="border border-black px-2"
          />
          <button
            onClick={handleClick}
            className="bg-black text-white border-2 rounded-full px-4 py-2 m-10"
          >
            Send
          </button>
        </form>
        {users.map((user) => (
          <Link key={user.id} href={`/user/${user.id}`}>
            {JSON.stringify(user)}
          </Link>
        ))}
      </div>
    </div>
  );
}
