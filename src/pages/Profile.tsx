import Navbar from "@/components/ui/Navbar";

import { Mail, User, Edit3 } from "lucide-react";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import BottomNavigation from "@/components/ui/BottomNavigation";

import { useNavigate } from "react-router-dom";
import { GET_APPLICATIONS, GET_AUTHENTICATED_USER } from "@/lib/queries";
import { useQuery } from "@apollo/client";
import { Education, Experience, License } from "@/lib/types";
import dayjs from "dayjs";

export default function ProfilePage() {
  const navigate = useNavigate();

  const { data: userData } = useQuery(GET_AUTHENTICATED_USER);
  const { data: applications } = useQuery(GET_APPLICATIONS);

  console.log(userData);
  return (
    <div className="font-poppins relative flex min-h-screen w-full flex-col items-center bg-secondary pb-20">
      {/* Navbar */}
      <Navbar />

      {/* Profile Header */}
      <div className="flex w-full flex-col gap-4 p-4 md:mt-28 md:max-w-2xl lg:max-w-4xl">
        {/* Basic Info */}

        <div className="relative mb-4 flex flex-col items-center space-y-3">
          {/* Edit Button */}
          <button
            className="absolute right-0 top-0 rounded-full bg-primary p-2 text-background shadow-lg transition hover:bg-secondary hover:text-primary"
            aria-label="Edit Profile"
            onClick={() => navigate("/profile-setting")}
          >
            <Edit3 className="h-5 w-5" />
          </button>

          {/* Avatar */}
          <Avatar className="h-24 w-24 rounded-full border-4 border-[#EDE1F4] shadow-md">
            <AvatarImage
              src={
                userData?.getAuthenticatedUser.avatar ||
                `https://api.dicebear.com/9.x/initials/svg?seed=${userData?.getAuthenticatedUser?.username}`
              }
              alt="User avatar"
              className="h-full w-full rounded-full object-cover"
            />
          </Avatar>

          {/* Name */}
          <h1 className="text-lg font-bold text-gray-800">
            {userData?.getAuthenticatedUser.fullName}
          </h1>

          {/* Contact Information */}
          <div className="flex flex-col items-center space-y-2 text-sm font-medium text-gray-700 md:flex-row md:space-x-4 md:space-y-0">
            {/* Username */}
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-primary" />
              <span>{userData?.getAuthenticatedUser.username}</span>
            </div>

            {/* Divider */}
            <span className="hidden md:inline-block">|</span>

            {/* Email */}
            <div className="flex items-center space-x-2">
              <Mail className="h-5 w-5 text-primary" />
              <span>{userData?.getAuthenticatedUser.email}</span>
            </div>
          </div>

          {/* Application Count */}
          <p className="text-sm text-gray-500">
            {applications?.getAllApplication.length} Applications
          </p>
        </div>

        {/* Bio Section */}
        <section className="p-4">
          <div className="w-full rounded-lg border border-gray-200 bg-background p-4 shadow-sm">
            <h3 className="text-base font-bold text-primary md:text-lg">Bio</h3>
            <p className="mt-2 text-sm text-primary md:text-base">
              {userData?.getAuthenticatedUser.profile.bio || "No bio available"}
            </p>
          </div>
        </section>

        {/* Summary Section */}
        <section className="px-4">
          <h2 className="text-lg font-semibold text-primary">Summary</h2>

          {/* Location Card */}
          <div className="mt-4 rounded-lg bg-background p-4 shadow-md">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-primary md:text-lg">
                Location
              </h3>
            </div>
            <div className="mt-2 text-gray-700">
              <p className="flex justify-between">
                <span className="text-sm">Country</span>
                <span className="text-sm">
                  {userData?.getAuthenticatedUser?.profile?.location?.split(
                    " ",
                  )[1] || "No country available"}
                </span>
              </p>
              <p className="flex justify-between">
                <span className="text-sm">City / State</span>
                <span className="text-sm">
                  {userData?.getAuthenticatedUser?.profile?.location?.split(
                    " ",
                  )[0] || "No city/state available"}
                </span>
              </p>
            </div>
          </div>

          {/* Career History Card */}
          <div className="mt-4 rounded-lg bg-background p-4 shadow-md">
            <h3 className="font-bold text-primary">Career History</h3>
            {userData?.getAuthenticatedUser?.profile?.experiences?.length ===
              0 && <p className="mt-2 text-sm">No career history available</p>}
            <div className="mt-2 divide-y divide-gray-300 text-gray-700">
              {userData?.getAuthenticatedUser?.profile?.experiences?.map(
                (experience: Experience) => (
                  <div
                    key={experience._id}
                    className="border-b-2 border-primary/10 py-2 last-of-type:border-none"
                  >
                    <p className="text-sm font-bold md:text-base">
                      {experience.jobTitle}
                    </p>
                    <p className="text-sm md:text-base">
                      {experience.institute}
                    </p>
                    <p className="text-sm italic md:text-base">
                      {dayjs(experience.startDate).format("MMM YYYY")} -{" "}
                      {dayjs(experience.endDate).format("MMM YYYY")}
                    </p>
                  </div>
                ),
              )}
            </div>
          </div>

          {/* Education Card */}
          <div className="mt-4 rounded-lg bg-background p-4 shadow-md">
            <h3 className="font-bold text-primary">Education History</h3>
            {userData?.getAuthenticatedUser?.profile?.education?.length ===
              0 && (
              <p className="mt-2 text-sm">No education history available</p>
            )}
            <div className="mt-2 divide-y divide-gray-300 text-gray-700">
              {userData?.getAuthenticatedUser?.profile?.education?.map(
                (education: Education) => (
                  <div
                    key={education._id}
                    className="border-b-2 border-primary/10 py-2 last-of-type:border-none"
                  >
                    <p className="text-sm font-bold md:text-base">
                      {education.name}
                    </p>
                    <p className="text-sm md:text-base">
                      {education.institute}
                    </p>
                    <p className="text-sm italic md:text-base">
                      {dayjs(education.startDate).format("MMM YYYY")} -{" "}
                      {dayjs(education.endDate).format("MMM YYYY")}
                    </p>
                  </div>
                ),
              )}
            </div>
          </div>

          {/* License Card */}
          <div className="mt-4 rounded-lg border border-gray-200 bg-background p-4 shadow-sm">
            <h3 className="font-bold text-primary">License / Certification</h3>
            <div className="text-primary">
              {userData?.getAuthenticatedUser?.profile?.education?.length ===
                0 && (
                <p className="mt-2 text-sm">No education history available</p>
              )}
              {userData?.getAuthenticatedUser?.profile?.licenses?.map(
                (license: License) => (
                  <div
                    key={license._id}
                    className="border-b-2 border-primary/10 py-2 last-of-type:border-none"
                  >
                    <p className="text-sm font-bold md:text-base">
                      {license.name}
                    </p>
                    <p className="text-sm md:text-base">{license.issuedBy}</p>
                    <p className="mt-2 text-sm italic">
                      {dayjs(license.issuedAt).format("MMM YYYY")} -{" "}
                      {dayjs(license.expiryDate).format("MMM YYYY")}
                    </p>
                    <p className="mt-2 text-sm md:text-base">
                      <span>Credential ID:</span> {license._id}
                    </p>
                  </div>
                ),
              )}
            </div>
          </div>
        </section>
      </div>
      <BottomNavigation />
    </div>
  );
}
