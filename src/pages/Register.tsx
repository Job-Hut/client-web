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
    <div className="flex min-h-screen flex-col items-center justify-center px-5 py-12 md:mx-auto md:w-3/4 lg:w-1/2 lg:justify-center">
      <div>
        <img
          src="/logo/logo-square.svg"
          alt="JobHut logo"
          className="lg:32 mb-5 w-20 md:w-24"
        />
      </div>
      <div className="flex flex-col gap-4 md:gap-8 lg:gap-16">
        <div className="flex flex-col gap-2 text-center">
          <h2 className="text-5xl font-bold lg:text-6xl">Register</h2>
          <p className="text-sm lg:text-base">
            Let's fill this form and create your account
          </p>
        </div>
        <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-2">
          <Input
            variant={"capsule-icon"}
            icon={<UserRound color="black" width={16} />}
            placeholder="Fullname"
            type="text"
            value={input.fullname}
            onChange={(e) => setInput({ ...input, fullname: e.target.value })}
          />
          <Input
            variant={"capsule-icon"}
            icon={<UserRound color="black" width={16} />}
            placeholder="Username"
            type="text"
            value={input.username}
            onChange={(e) => setInput({ ...input, username: e.target.value })}
          />
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
          <InputPassword
            variant={"capsule-icon"}
            icon={<Lock color="black" width={16} />}
            placeholder="Password Confirmation"
            value={input.passwordConfirmation}
            onChange={(e) =>
              setInput({ ...input, passwordConfirmation: e.target.value })
            }
          />
          <div className="mt-4 flex w-full flex-col gap-2">
            <Button size={"mobile"} disabled={loading}>
              Create Account
            </Button>
            <div className="flex items-center justify-center gap-1 text-center text-xs lg:text-base">
              <p>Already have an account? </p>
              <div className="group w-fit">
                <Link to={"/login"} className="font-bold">
                  Login
                </Link>
                <div
                  className={`transition-width mx-auto h-[1px] w-full bg-black duration-500 ease-out after:content-[""] group-hover:mx-auto group-hover:w-1/2`}
                ></div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
