import { Button } from "@/components/ui/button";
import { Input, InputPassword } from "@/components/ui/input";

import { Lock, Mail } from "lucide-react";
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  // const { login } = useAuth();

  const nav = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // const user = {
    //   _id: "123456",
    //   username: "johndoe",
    //   email: "johndoe@mail.com",
    // };

    // // contoh buat login
    // nanti ini bakal masuk ke state user dan access token
    // dan juga bakal disimpen di local storage
    // login({
    //   user ,
    //   accessToken: "123456",
    // })



    nav("/");
  };

  return (
    <div className="flex flex-col justify-between lg:justify-center px-5 py-12 min-h-screen md:w-3/4 md:mx-auto lg:w-1/2">
      <div>Logo</div>
      <div className="flex flex-col gap-4 md:gap-8 lg:gap-16">
        <div className="flex flex-col gap-2 lg:text-center">
          <h2 className="text-5xl lg:text-6xl font-bold text-collection-1">
            Login
          </h2>
          <p className="text-sm lg:text-base">
            Welcome back! Let's track your application!
          </p>
        </div>
        <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-4">
          <Input
            variant={"capsule-icon"}
            icon={<Mail color="black" />}
            placeholder="Email"
            type="email"
            value={input.email}
            onChange={(e) => setInput({ ...input, email: e.target.value })}
          />
          <InputPassword
            variant={"capsule-icon"}
            icon={<Lock color="black" />}
            placeholder="Password"
            value={input.password}
            onChange={(e) => setInput({ ...input, password: e.target.value })}
          />

          <div className="flex flex-col gap-2 w-full">
            <Button variant={"roundAccent"} size={"mobile"}>
              Login
            </Button>
            <p className="text-center text-xs lg:text-base">
              Do not have an account?{" "}
              <Link
                to={"/login"}
                className="font-bold text-collection-1 underline underline-offset-1"
              >
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
