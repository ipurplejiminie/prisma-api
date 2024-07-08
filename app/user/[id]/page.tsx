"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useState } from "react";

const UserEditPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const id = useParams<{ id: string }>().id;

  const handleUpdate = async () => {
    console.log("clicked");
  };

  const router = useRouter();

  const handleDelete = async () => {
    const res = await fetch(`/api/user/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    router.push("/");
    router.refresh();
  };

  const fetchUser = async () => {
    const res = await fetch(`/api/user/${id}`);
    console.log(res);
    const data = await res.json();
    console.log(data);

    setName(data.name);
    setEmail(data.email);
  };
  useEffect(() => {
    console.log(id);
    fetchUser();
  }, []);

  return (
    <div className="container mx-auto">
      <div className="flex flex-col h-screen items-center justify-center">
        <h1>Edit Page</h1>
        <form className="flex flex-col space-y-3 m-10">
          <input
            onChange={(event) => {
              setName(event.target.value);
            }}
            placeholder="name"
            type="text"
            value={name}
            className="border border-black px-2"
          />
          <input
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            placeholder="email"
            type="text"
            value={email}
            className="border border-black px-2"
          />
        </form>
        <button
          onClick={handleUpdate}
          className="bg-black text-white border-2 rounded-full px-4 py-2 m-10"
        >
          Update
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white border-2 rounded-full px-4 py-2 m-10"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default UserEditPage;
