import Navbar from "@/components/ui/Navbar";
import { Mail, Phone, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import BottomNavigation from "@/components/ui/BottomNavigation";

export default function ProfilePage() {
  return (
    <div className="font-poppins relative flex min-h-screen w-full flex-col items-center bg-secondary">
      {/* Navbar */}
      <Navbar />

      {/* Profile Header */}
      <div className="w-full p-4 md:mt-28 md:max-w-2xl lg:max-w-4xl">
        {/* Basic Info */}
        <div className="mb-4 flex flex-col items-center space-y-3">
          {/* Avatar */}
          <Avatar className="h-24 w-24 rounded-full border-4 border-[#EDE1F4] shadow-md">
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt="User avatar"
              className="rounded-full"
            />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>

          {/* Name */}
          <h1 className="text-2xl font-bold text-gray-800">John Doe</h1>

          {/* Contact Information */}
          <div className="flex flex-col items-center space-y-2 text-sm font-medium text-gray-700 md:flex-row md:space-x-4 md:space-y-0">
            {/* Username */}
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-primary" />
              <span>johndoe123</span>
            </div>

            {/* Divider */}
            <span className="hidden md:inline-block">|</span>

            {/* Phone number */}
            <div className="flex items-center space-x-2">
              <Phone className="h-5 w-5 text-primary" />
              <span>+1 (123) 456-7890</span>
            </div>

            {/* Divider */}
            <span className="hidden md:inline-block">|</span>

            {/* Email */}
            <div className="flex items-center space-x-2">
              <Mail className="h-5 w-5 text-primary" />
              <span>johndoe@example.com</span>
            </div>
          </div>

          {/* Application Count */}
          <p className="text-sm text-gray-500">100 Applications</p>
        </div>

        {/* Bio Section */}
        <section className="mt-4 w-full rounded-lg border border-gray-200 bg-background p-4 shadow-sm">
          <h2 className="text-lg font-semibold text-primary">Bio</h2>
          <p className="mt-2 text-sm text-gray-700 md:text-base">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            sit amet eros ut orci faucibus bibendum vitae sit amet urna. Nulla
            facilisi. Morbi fringilla nisi a libero fermentum, et faucibus
            ligula ultrices.
          </p>
        </section>

        {/* Summary Section */}
        <section className="mt-4 p-4">
          <h2 className="text-lg font-semibold text-gray-700">Summary</h2>

          {/* Location Card */}
          <div className="mt-4 rounded-lg border border-gray-200 bg-background p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-primary">Location</h3>
            </div>
            <div className="mt-2 text-gray-700">
              <p className="flex justify-between">
                <span>Country</span>
                <span className="font-medium">Konoha</span>
              </p>
              <p className="flex justify-between">
                <span>City / State</span>
                <span className="font-medium">IKN brader</span>
              </p>
            </div>
          </div>

          {/* Career History Card */}
          <div className="mt-4 rounded-lg border border-gray-200 bg-background p-4 shadow-sm">
            <h3 className="font-bold text-primary">Career History</h3>
            <div className="mt-2 text-gray-700">
              <div className="border-b border-gray-200 py-2">
                <p>Part time programmer</p>
                <p>Hacktiv8</p>
                <p className="text-sm italic">Aug 2024 - Nov 2024</p>
              </div>
              <div className="py-2">
                <p>Part time programmer</p>
                <p>Hacktiv8</p>
                <p className="text-sm italic">Aug 2024 - Nov 2024</p>
              </div>
            </div>
          </div>

          {/* Education Card */}
          <div className="mt-4 rounded-lg border border-gray-200 bg-background p-4 shadow-sm">
            <h3 className="font-bold text-primary">Education History</h3>
            <div className="mt-2 text-gray-700">
              <div className="border-b border-gray-200 py-2">
                <p>Sekolah Tinggi Bajak Laut</p>
                <p>S1 IT</p>
                <div className="flex w-full items-center justify-between">
                  <p className="text-sm italic">Aug 2024 - Nov 2024</p>
                  <p>GPA: 3.8/4.0</p>
                </div>
              </div>
              <div className="border-b border-gray-200 py-2">
                <p>Sekolah Tinggi Bajak Laut</p>
                <p>S1 IT</p>
                <div className="flex w-full items-center justify-between">
                  <p className="text-sm italic">Aug 2024 - Nov 2024</p>
                  <p>GPA: 3.8/4.0</p>
                </div>
              </div>
            </div>
          </div>

          {/* License Card */}
          <div className="mb-40 mt-4 rounded-lg border border-gray-200 bg-background p-4 shadow-sm">
            <h3 className="font-bold text-primary">License / Certification</h3>
            <div className="mt-2 text-gray-700">
              <div className="border-b border-gray-200 py-2">
                <p>Introduction to Javascript</p>
                <p>Udemy</p>
                <div className="flex w-full items-center justify-between">
                  <p className="text-sm italic">Aug 2024 - Nov 2024</p>
                </div>
              </div>
              <div className="border-b border-gray-200 py-2">
                <p>Introduction to Javascript</p>
                <p>Udemy</p>
                <div className="flex w-full items-center justify-between">
                  <p className="text-sm italic">Aug 2024 - Nov 2024</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <BottomNavigation />
    </div>
  );
}
