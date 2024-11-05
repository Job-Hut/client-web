import { Button } from "@/components/ui/button";
import { Input, InputPassword } from "@/components/ui/input";
import useAuth from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { gql, useMutation } from "@apollo/client";

import { Lock, Mail } from "lucide-react";
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const { toast } = useToast();

  const { login } = useAuth();

  const [loginMutation, { loading }] = useMutation(
    gql`
      mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          access_token
          userId
          username
          email
        }
      }
    `,
    {
      variables: input,
    },
  );

  const nav = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const { data } = await loginMutation();

      login({
        user: {
          id: data.login?.userId,
          email: data.login?.email,
          username: data.login?.username,
        },
        accessToken: data.login?.access_token,
      });
      // debugger;

      nav("/");
    } catch (error) {
      toast({
        title: "Failed",
        description: "Invalid email or password",
        variant: "destructive",
      });
      // ! Handle error
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-between px-5 py-12 md:mx-auto md:w-3/4 lg:w-1/2 lg:justify-center">
      <div>Logo</div>
      <div className="flex flex-col gap-4 md:gap-8 lg:gap-16">
        <div className="flex flex-col gap-2 lg:text-center">
          <h2 className="text-5xl font-bold lg:text-6xl">Login</h2>
          <p className="text-sm lg:text-base">
            Welcome back! Let's track your application!
          </p>
        </div>
        <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-4">
          <Input
            variant={"capsule-icon"}
            icon={<Mail color="black" width={16} />}
            placeholder="Email"
            type="email"
            value={input.email}
            onChange={(e) => setInput({ ...input, email: e.target.value })}
          />
          <InputPassword
            variant={"capsule-icon"}
            icon={<Lock color="black" width={16} />}
            placeholder="Password"
            value={input.password}
            onChange={(e) => setInput({ ...input, password: e.target.value })}
          />

          <div className="flex w-full flex-col gap-2">
            <Button size={"mobile"} disabled={loading}>
              Login
            </Button>
            <p className="text-center text-xs lg:text-base">
              Do not have an account?{" "}
              <Link
                to={"/register"}
                className="font-bold underline underline-offset-1"
              >
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
