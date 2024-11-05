import Navbar from "@/components/ui/Navbar";
import { Edit3 } from "lucide-react";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_AVATAR, UPDATE_PROFILE } from "@/lib/mutation";
import { GET_AUTHENTICATED_USER } from "@/lib/queries";
import dayjs from "dayjs";
import { Education, Experience, License } from "@/lib/types";
import AddCareerModal from "@/components/ui/AddCareerModal";
import AddEducationModal from "@/components/ui/AddEducationmodal";

export default function ProfileSetting() {
  const [isEditImageModalOpen, setEditImageModalOpen] = useState(false);
  const [isAddCareerModalOpen, setAddCareerModalOpen] = useState(false);
  const [isAddEducationModalOpen, setAddEducationModalOpen] = useState(false);
  const [isAddLicenseModalOpen, setAddLicenseModalOpen] = useState(false);

  const [avatar, setAvatar] = useState<File | null>(null);
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");

  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");

  const { toast } = useToast();

  const openEditImageModal = () => setEditImageModalOpen(true);
  const closeEditImageModal = () => setEditImageModalOpen(false);

  const openAddCareerModal = () => setAddCareerModalOpen(true);
  const closeAddCareerModal = () => setAddCareerModalOpen(false);

  const openAddEducationModal = () => setAddEducationModalOpen(true);
  const closeAddEducationModal = () => setAddEducationModalOpen(false);

  const openAddLicenseModal = () => setAddLicenseModalOpen(true);
  const closeAddLicenseModal = () => setAddLicenseModalOpen(false);

  const { data: userData } = useQuery(GET_AUTHENTICATED_USER);

  const [updateAvatarMutation, { loading: updateAvatarLoading }] =
    useMutation(UPDATE_AVATAR);

  const [updateProfile, { loading: updateProfileLoading }] =
    useMutation(UPDATE_PROFILE);

  const updateAvatarHandler = async () => {
    try {
      if (avatar) {
        await updateAvatarMutation({
          variables: {
            avatar,
          },
        });
        toast({
          title: "Success",
          description: "Avatar updated successfully",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  };

  const updateUserProfile = async () => {
    try {
      await updateProfile({
        variables: {
          username,
          fullName,
          location: `${city} ${country}`,
          bio,
        },
      });

      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (userData) {
      setUsername(userData.getAuthenticatedUser.username);
      setFullName(userData.getAuthenticatedUser.fullName);
      setEmail(userData.getAuthenticatedUser.email);
      setBio(userData.getAuthenticatedUser.profile.bio);
      setCountry(
        userData.getAuthenticatedUser.profile.location?.split(" ")[1] || "",
      );
      setCity(
        userData.getAuthenticatedUser.profile.location?.split(" ")[0] || "",
      );
    }
  }, [userData]);

  return (
    <div className="font-poppins relative flex min-h-screen w-full flex-col items-center bg-secondary">
      {/* Navbar */}
      <Navbar />

      <div className="w-full p-4 md:mt-28 md:max-w-2xl lg:max-w-3xl">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Profile Setting
        </h1>
        <div>
          {/* Avatar */}
          <div className="relative mb-6 flex justify-center">
            <Avatar className="relative h-24 w-24 rounded-full border-4 border-[#EDE1F4] shadow-md">
              <AvatarImage
                src={
                  userData?.getAuthenticatedUser?.avatar ||
                  `https://avatar.iran.liara.run/username?username=${userData?.getAuthenticatedUser?.username}`
                }
                alt="User avatar"
                className="h-full w-full rounded-full object-cover"
              />

              {/* Edit image */}
              <button
                className="hover:bg-primary-dark absolute bottom-0 right-0 transform rounded-full bg-primary p-2 text-white shadow-lg transition-transform hover:scale-105"
                aria-label="Change Profile Image"
                onClick={() => openEditImageModal()}
                type="button"
              >
                <Edit3 className="h-5 w-5" />
              </button>
            </Avatar>
          </div>

          {/* Contact Information */}
          <div className="mb-6 space-y-4">
            <Input
              id="username"
              name="username"
              placeholder="Username"
              type="text"
              inputSize={"small"}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              id="fullName"
              name="fullName"
              placeholder="Full Name"
              type="text"
              inputSize={"small"}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <Input
              id="email"
              name="email"
              placeholder="Email"
              type="email"
              inputSize={"small"}
              value={email}
              readOnly
            />
          </div>

          {/* Bio/Summary Section */}
          <h2 className="mb-2 text-lg font-semibold text-primary">About Me</h2>
          <Textarea
            id="summary"
            name="summary"
            placeholder="Bio/Summary"
            className="mb-6 h-24 w-full resize-none rounded-lg border border-primary p-4"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          >
            {bio}
          </Textarea>
          {/* Location Section */}
          <div className="mb-4 rounded-lg border border-primary bg-background p-4 shadow-sm">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="font-bold text-primary">Location</h3>
            </div>
            <div className="space-y-2 text-gray-700">
              <div className="flex justify-between">
                <span>Country</span>
                <Input
                  id="country"
                  name="country"
                  placeholder="Country"
                  type="text"
                  inputSize={"small"}
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>
              <div className="flex justify-between">
                <span>City / State</span>
                <Input
                  id="city"
                  name="city"
                  placeholder="City / State"
                  type="text"
                  inputSize={"small"}
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Career History Section */}
          <div className="mb-4 rounded-lg border border-primary bg-background p-4 shadow-sm">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="font-bold text-primary">Career History</h3>
              <Button onClick={openAddCareerModal} type="button">
                + Add
              </Button>
            </div>
            <div>
              {/* Career  Card */}
              {userData?.getAuthenticatedUser?.profile?.experiences?.length ===
                0 && <p>No career history available</p>}
              <div className="mt-2 divide-y divide-gray-300 text-gray-700">
                {userData?.getAuthenticatedUser?.profile?.experiences?.map(
                  (experience: Experience) => (
                    <div key={experience._id} className="py-4">
                      <p className="font-bold">{experience.jobTitle}</p>
                      <p>{experience.institute}</p>
                      <p className="mt-2 text-sm italic">
                        {dayjs(experience.startDate).format("MMM YYYY")} -{" "}
                        {dayjs(experience.endDate).format("MMM YYYY")}
                      </p>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>

          {/* Education Section */}
          <div className="mb-4 rounded-lg border border-primary bg-background p-4 shadow-sm">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="font-bold text-primary">Education</h3>
              <Button type="button" onClick={openAddEducationModal}>
                + Add
              </Button>
            </div>
            <div>
              {/* Education Card */}
              {userData?.getAuthenticatedUser?.profile?.education?.length ===
                0 && <p>No career history available</p>}
              <div className="mt-2 divide-y divide-gray-300 text-gray-700">
                {userData?.getAuthenticatedUser?.profile?.education?.map(
                  (experience: Education) => (
                    <div key={experience._id} className="py-4">
                      <p className="font-bold">{experience.name}</p>
                      <p>{experience.institute}</p>
                      <p className="mt-2 text-sm italic">
                        {dayjs(experience.startDate).format("MMM YYYY")} -{" "}
                        {dayjs(experience.endDate).format("MMM YYYY")}
                      </p>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>

          {/* License/Certification Section */}
          <div className="mb-6 rounded-lg border border-primary bg-background p-4 shadow-sm">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="font-bold text-primary">
                License / Certification
              </h3>
              <Button type="button" onClick={openAddLicenseModal}>
                + Add
              </Button>
            </div>
            <div>
              {/* License/Certification Card */}
              {userData?.getAuthenticatedUser?.profile?.education?.length ===
                0 && <p>No career history available</p>}
              <div className="mt-2 divide-y divide-gray-300 text-gray-700">
                {userData?.getAuthenticatedUser?.profile?.licenses?.map(
                  (license: License) => (
                    <div key={license._id} className="py-4">
                      <p className="font-bold">{license.name}</p>
                      <p>{license.issuedBy}</p>
                      <p className="mt-2 text-sm italic">
                        {dayjs(license.issuedAt).format("MMM YYYY")} -{" "}
                        {dayjs(license.expiryDate).format("MMM YYYY")}
                      </p>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="mb-40 flex justify-center">
            <button
              className="hover:bg-primary-dark w-3/4 rounded-full bg-primary py-2 font-bold text-white shadow-md transition"
              onClick={() => updateUserProfile()}
              disabled={updateProfileLoading}
            >
              Save
            </button>
          </div>
        </div>
      </div>

      {/* Edit image modal */}
      {isEditImageModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <button
              onClick={closeEditImageModal}
              className="absolute right-2 top-2 text-gray-600 hover:text-gray-800"
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              Upload New Avatar
            </h2>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Select Image
              </label>
              <input
                type="file"
                accept="image/*"
                className="block w-full rounded-md border border-gray-300 p-2"
                name="avatar"
                onChange={(e) => setAvatar(e.target.files?.[0] ?? null)}
              />
              <Button
                type="submit"
                className="hover:bg-primary-dark mt-4 w-full rounded-md bg-primary py-2 font-semibold text-white shadow-sm"
                onClick={async () => {
                  await updateAvatarHandler();
                  closeEditImageModal();
                }}
                disabled={updateAvatarLoading}
              >
                Upload
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Add career modal */}
      {isAddCareerModalOpen && (
        <AddCareerModal closeAddCareerModal={closeAddCareerModal} />
      )}

      {/* Add education modal */}
      {isAddEducationModalOpen && (
        <AddEducationModal closeAddEducationModal={closeAddEducationModal} />
      )}

      {/* Add license modal */}
      {isAddLicenseModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <button
              onClick={closeAddLicenseModal}
              className="absolute right-2 top-2 text-gray-600 hover:text-gray-800"
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              Add License / Certification
            </h2>
            <form onSubmit={(e) => e.preventDefault()}>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                License / Certification Name
              </label>
              <Input
                id="license"
                name="license"
                placeholder="License / Certification Name"
                type="text"
                inputSize={"small"}
              />

              <label className="mb-2 block text-sm font-medium text-gray-700">
                Issuing Organization
              </label>
              <Input
                id="organization"
                name="organization"
                placeholder="Issuing Organization Name"
                type="text"
                inputSize={"small"}
              />

              <label className="mb-2 block text-sm font-medium text-gray-700">
                Validity
              </label>
              <div className="flex gap-2">
                <Input
                  id="expiredDate"
                  name="expiredDate"
                  placeholder="Start Date (e.g., Aug 2024)"
                  type="text"
                  inputSize={"small"}
                  className="flex-1"
                />
              </div>

              <Button
                className="hover:bg-primary-dark mt-4 w-full rounded-md bg-primary py-2 font-semibold text-white shadow-sm"
                onClick={() => {
                  closeAddLicenseModal();
                }}
              >
                Add License / Certification
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
