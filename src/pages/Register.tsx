import { Button } from "@/components/ui/button";
import { Input, InputPassword } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { gql, useMutation } from "@apollo/client";
import { Lock, Mail, UserRound } from "lucide-react";
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [input, setInput] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  const { toast } = useToast();

  const [registerMutation, { loading }] = useMutation(gql`
    mutation Register($input: RegisterInput) {
      register(input: $input) {
        _id
        username
      }
    }
  `);

  const nav = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const user = {
        fullName: input.fullname,
        username: input.username,
        email: input.email,
        password: input.password,
      };
      await registerMutation({ variables: { input: user } });
      toast({
        title: "Success",
        description: "Account created successfully",
      });
      nav("/login");
    } catch (err: unknown) {
      toast({
        title: "Error",
        description: (err as Error).message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-between px-5 py-12 md:mx-auto md:w-3/4 lg:w-1/2 lg:justify-center">
      <div>Logo</div>
      <div className="flex flex-col gap-4 md:gap-8 lg:gap-16">
        <div className="flex flex-col gap-2 lg:text-center">
          <h2 className="text-5xl font-bold text-collection-1 lg:text-6xl">
            Register
          </h2>
          <p className="text-sm lg:text-base">
            Let's fill this form and create your account
          </p>
        </div>
        <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-4">
          <Input
            variant={"capsule-icon"}
            icon={<UserRound color="black" />}
            placeholder="Fullname"
            type="text"
            value={input.fullname}
            onChange={(e) => setInput({ ...input, fullname: e.target.value })}
          />
          <Input
            variant={"capsule-icon"}
            icon={<UserRound color="black" />}
            placeholder="Username"
            type="text"
            value={input.username}
            onChange={(e) => setInput({ ...input, username: e.target.value })}
          />
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
          <InputPassword
            variant={"capsule-icon"}
            icon={<Lock color="black" />}
            placeholder="Password Confirmation"
            value={input.passwordConfirmation}
            onChange={(e) =>
              setInput({ ...input, passwordConfirmation: e.target.value })
            }
          />
          <div className="flex w-full flex-col gap-2">
            <Button variant={"roundAccent"} size={"mobile"} disabled={loading}>
              Create Account
            </Button>
            <p className="text-center text-xs lg:text-base">
              Already have an account?{" "}
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
