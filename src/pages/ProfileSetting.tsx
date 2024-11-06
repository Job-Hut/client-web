import { Edit3, PencilIcon, SaveIcon } from "lucide-react";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery } from "@apollo/client";
import {
  DELETE_EDUCATION,
  DELETE_EXPERIENCE,
  DELETE_LICENSE,
  UPDATE_AVATAR,
  UPDATE_EDUCATION,
  UPDATE_EXPERIENCE,
  UPDATE_LICENSE,
  UPDATE_PROFILE,
} from "@/lib/mutation";
import { GET_AUTHENTICATED_USER } from "@/lib/queries";
import dayjs from "dayjs";
import { Education, Experience, License } from "@/lib/types";
import AddCareerModal from "@/components/ui/AddCareerModal";
import AddEducationModal from "@/components/ui/AddEducationmodal";
import AddLicenseModal from "@/components/ui/AddLicenseModal";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";

export default function ProfileSetting() {
  const navigate = useNavigate();
  const [isEditImageModalOpen, setEditImageModalOpen] = useState(false);
  const [isAddCareerModalOpen, setAddCareerModalOpen] = useState(false);
  const [isAddEducationModalOpen, setAddEducationModalOpen] = useState(false);
  const [isAddLicenseModalOpen, setAddLicenseModalOpen] = useState(false);

  const [isEditCareerModalOpen, setEditCareerModalOpen] = useState(false);
  const [isEditEducationModalOpen, setEditEducationModalOpen] = useState(false);
  const [isEditLicenseModalOpen, setIsEditLicenseModalOpen] = useState(false);

  const [editCareerInput, setEditCareerInput] = useState({
    id: "",
    jobTitle: "",
    company: "",
    startDate: "",
    endDate: "",
  });

  const [editEducationInput, setEditEducationInput] = useState({
    id: "",
    name: "",
    institute: "",
    startDate: "",
    endDate: "",
  });

  const [editLicenseInput, setEditLicenseInput] = useState({
    id: "",
    name: "",
    number: "",
    issuedBy: "",
    issuedAt: "",
    expiryDate: "",
  });

  const [avatar, setAvatar] = useState<File | null>(null);
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [jobPrefs, setJobPrefs] = useState("");

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

  const [updateAvatarMutation, { loading: updateAvatarLoading }] = useMutation(
    UPDATE_AVATAR,
    {
      refetchQueries: ["GetAuthenticatedUser"],
    },
  );

  const [updateProfileMutation, { loading: updateProfileLoading }] =
    useMutation(UPDATE_PROFILE, {
      refetchQueries: ["GetAuthenticatedUser"],
    });

  const [updateExperience, { loading: updateExperienceLoading }] = useMutation(
    UPDATE_EXPERIENCE,
    {
      refetchQueries: ["GetAuthenticatedUser"],
    },
  );

  const [deleteExperience, { loading: deleteExperienceLoading }] = useMutation(
    DELETE_EXPERIENCE,
    {
      refetchQueries: ["GetAuthenticatedUser"],
    },
  );

  const [updateEducation, { loading: updateEducationLoading }] = useMutation(
    UPDATE_EDUCATION,
    {
      refetchQueries: ["GetAuthenticatedUser"],
    },
  );

  const [deleteEducation, { loading: deleteEducationLoading }] = useMutation(
    DELETE_EDUCATION,
    {
      refetchQueries: ["GetAuthenticatedUser"],
    },
  );

  const [editLicense, { loading: editLicenseLoading }] = useMutation(
    UPDATE_LICENSE,
    {
      refetchQueries: ["GetAuthenticatedUser"],
    },
  );

  const [deleteLicense, { loading: deleteLicenseLoading }] = useMutation(
    DELETE_LICENSE,
    {
      refetchQueries: ["GetAuthenticatedUser"],
    },
  );

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

  const updateUserProfileHandler = async () => {
    try {
      await updateProfileMutation({
        variables: {
          username,
          fullName,
          location: `${city} ${country}`,
          bio,
          jobPrefs: jobPrefs.split(",").map((jobPref) => jobPref.trim()),
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

  const updateExperienceHandler = async () => {
    try {
      await updateExperience({
        variables: {
          experienceId: editCareerInput.id,
          input: {
            jobTitle: editCareerInput.jobTitle,
            institute: editCareerInput.company,
            startDate: editCareerInput.startDate,
            endDate: editCareerInput.endDate,
          },
        },
      });
      toast({
        title: "Success",
        description: "Career history updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  };

  const deleteExperienceHandler = async (id: string) => {
    try {
      await deleteExperience({
        variables: {
          experienceId: id,
        },
      });
      toast({
        title: "Success",
        description: "Career history deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  };

  const updateEducationHandler = async () => {
    try {
      await updateEducation({
        variables: {
          educationId: editEducationInput.id,
          input: {
            name: editEducationInput.name,
            institute: editEducationInput.institute,
            startDate: editEducationInput.startDate,
            endDate: editEducationInput.endDate,
          },
        },
      });
      toast({
        title: "Success",
        description: "Education updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  };

  const deleteEducationHandler = async (id: string) => {
    try {
      await deleteEducation({
        variables: {
          educationId: id,
        },
      });
      toast({
        title: "Success",
        description: "Education deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  };

  const updateLicenseHandler = async () => {
    try {
      await editLicense({
        variables: {
          licenseId: editLicenseInput.id,
          input: {
            name: editLicenseInput.name,
            number: editLicenseInput.number,
            issuedBy: editLicenseInput.issuedBy,
            issuedAt: editLicenseInput.issuedAt,
            expiryDate: editLicenseInput.expiryDate,
          },
        },
      });
      toast({
        title: "Success",
        description: "License updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  };

  const deleteLicenseHandler = async (id: string) => {
    try {
      await deleteLicense({
        variables: {
          licenseId: id,
        },
      });
      toast({
        title: "Success",
        description: "License deleted successfully",
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
      console.log(userData);
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
      setJobPrefs(
        userData.getAuthenticatedUser.profile.jobPrefs?.join(", ") || "",
      );
    }
  }, [userData]);

  return (
    <div className="font-poppins relative flex min-h-screen w-full flex-col items-center bg-secondary">
      {/* Navbar */}
      <div className="flex w-full items-center justify-between bg-black p-4 text-background md:justify-center">
        <button
          className="text-lg"
          aria-label="Go back"
          onClick={() => navigate(`/profile`)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-circle-arrow-left"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M16 12H8" />
            <path d="m12 8-4 4 4 4" />
          </svg>
        </button>

        <h2 className="absolute left-1/2 -translate-x-1/2 transform text-base font-semibold sm:text-lg">
          Profile Setting
        </h2>
      </div>

      <div className="w-full p-4 md:mt-28 md:max-w-2xl lg:max-w-3xl">
        <h1 className="mb-6 hidden text-center text-2xl font-bold text-gray-800 md:block">
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
          <div className="mb-6 space-y-2">
            <div>
              <Label>Username</Label>
              <Input
                id="username"
                name="username"
                placeholder="Username"
                type="text"
                inputSize={"small"}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <Label>Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                placeholder="Full Name"
                type="text"
                inputSize={"small"}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div>
              <Label>Email</Label>
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
            <div>
              <Label htmlFor="jobPrefs">
                Job Preferences (Separated by comma, e.g., Developer, Designer)
              </Label>
              <Input
                id="jobPrefs"
                name="jobPrefs"
                placeholder="Job Preferences"
                type="text"
                inputSize={"small"}
                value={jobPrefs}
                onChange={(e) => setJobPrefs(e.target.value)}
              />
            </div>
          </div>

          {/* Bio/Summary Section */}
          <h2 className="mb-2 text-sm font-medium text-primary">About Me</h2>
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
              <h3 className="text-md font-bold text-primary">Location</h3>
            </div>
            <div className="space-y-2 text-gray-700">
              <div className="flex justify-between">
                <span className="text-sm">Country</span>
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
                <span className="text-sm">City / State</span>
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
              <h3 className="text-md font-bold text-primary">Career History</h3>
              <Button onClick={openAddCareerModal} type="button">
                + Add
              </Button>
            </div>
            <div>
              {/* Career  Card */}
              {userData?.getAuthenticatedUser?.profile?.experiences?.length ===
                0 && <p className="text-sm">No career history available</p>}
              <div className="mt-2 divide-y divide-gray-300 text-gray-700">
                {userData?.getAuthenticatedUser?.profile?.experiences?.map(
                  (experience: Experience) => (
                    <div key={experience._id} className="py-4">
                      <div className="m-0 flex items-start justify-between">
                        <div>
                          <p className="font-bold">{experience.jobTitle}</p>
                          <p>{experience.institute}</p>
                        </div>
                        <Button
                          variant="outline"
                          className="h-10 w-10"
                          onClick={() => {
                            setEditCareerInput({
                              id: experience._id,
                              jobTitle: experience.jobTitle,
                              company: experience.institute,
                              startDate: dayjs(experience.startDate).format(
                                "YYYY-MM-DD",
                              ),
                              endDate: dayjs(experience.endDate).format(
                                "YYYY-MM-DD",
                              ),
                            });
                            setEditCareerModalOpen(true);
                          }}
                        >
                          <PencilIcon size={10} />
                        </Button>
                      </div>
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
              <h3 className="text-md font-bold text-primary">Education</h3>
              <Button type="button" onClick={openAddEducationModal}>
                + Add
              </Button>
            </div>
            <div>
              {/* Education Card */}
              {userData?.getAuthenticatedUser?.profile?.education?.length ===
                0 && <p className="text-sm">No educations available</p>}
              <div className="mt-2 divide-y divide-gray-300 text-gray-700">
                {userData?.getAuthenticatedUser?.profile?.education?.map(
                  (education: Education) => (
                    <div key={education._id} className="py-4">
                      <div className="flex justify-between">
                        <div>
                          <p className="font-bold">{education.name}</p>

                          <p>{education.institute}</p>
                        </div>
                        <Button
                          variant="outline"
                          className="h-10 w-10"
                          onClick={() => {
                            setEditEducationInput({
                              id: education._id,
                              name: education.name,
                              institute: education.institute,
                              startDate: dayjs(education.startDate).format(
                                "YYYY-MM-DD",
                              ),
                              endDate: dayjs(education.endDate).format(
                                "YYYY-MM-DD",
                              ),
                            });
                            setEditEducationModalOpen(true);
                          }}
                        >
                          <PencilIcon size={16} />
                        </Button>
                      </div>
                      <p className="mt-2 text-sm italic">
                        {dayjs(education.startDate).format("MMM YYYY")} -{" "}
                        {dayjs(education.endDate).format("MMM YYYY")}
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
              <h3 className="text-md font-bold text-primary">
                License / Certification
              </h3>
              <Button type="button" onClick={openAddLicenseModal}>
                + Add
              </Button>
            </div>
            <div>
              {/* License/Certification Card */}
              {userData?.getAuthenticatedUser?.profile?.licenses?.length ===
                0 && <p className="text-sm">No licenses available</p>}
              <div className="mt-2 divide-y divide-gray-300 text-gray-700">
                {userData?.getAuthenticatedUser?.profile?.licenses?.map(
                  (license: License) => (
                    <div key={license._id} className="py-4">
                      <div className="flex justify-between">
                        <p className="font-bold">{license.name}</p>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setEditLicenseInput({
                              id: license._id,
                              name: license.name,
                              number: license.number,
                              issuedBy: license.issuedBy,
                              issuedAt: dayjs(license.issuedAt).format(
                                "YYYY-MM-DD",
                              ),
                              expiryDate: dayjs(license.expiryDate).format(
                                "YYYY-MM-DD",
                              ),
                            });
                            setIsEditLicenseModalOpen(true);
                          }}
                        >
                          <PencilIcon size={16} />
                        </Button>
                      </div>
                      <p>{license.issuedBy}</p>
                      <p className="mt-2 text-sm italic">
                        {dayjs(license.issuedAt).format("MMM YYYY")} -{" "}
                        {dayjs(license.expiryDate).format("MMM YYYY")}
                      </p>
                      <p className="mt-2">License Number: {license.number}</p>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="mb-10 flex w-full justify-end">
            <Button
              className="hover:bg-primary-dark w-full bg-primary py-2 font-medium text-white shadow-md transition"
              onClick={() => updateUserProfileHandler()}
              disabled={updateProfileLoading}
            >
              <SaveIcon />
              Save
            </Button>
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
        <AddLicenseModal closeAddLicenseModal={closeAddLicenseModal} />
      )}

      {/* Edit Career Modal */}
      {isEditCareerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <button
              onClick={() => setEditCareerModalOpen(false)}
              className="absolute right-2 top-2 text-gray-600 hover:text-gray-800"
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              Edit Career History
            </h2>
            <form>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Job Title
              </label>
              <Input
                id="jobTitle"
                name="jobTitle"
                placeholder="Job Title"
                type="text"
                inputSize={"small"}
                value={editCareerInput.jobTitle}
                onChange={(e) =>
                  setEditCareerInput({
                    ...editCareerInput,
                    jobTitle: e.target.value,
                  })
                }
              />

              <label className="mb-2 block text-sm font-medium text-gray-700">
                Company
              </label>
              <Input
                id="company"
                name="company"
                placeholder="Company"
                type="text"
                inputSize={"small"}
                value={editCareerInput.company}
                onChange={(e) =>
                  setEditCareerInput({
                    ...editCareerInput,
                    company: e.target.value,
                  })
                }
              />

              <label className="mb-2 block text-sm font-medium text-gray-700">
                Start Date
              </label>
              <Input
                id="startDate"
                name="startDate"
                placeholder="Start Date"
                type="date"
                inputSize={"small"}
                value={editCareerInput.startDate}
                onChange={(e) =>
                  setEditCareerInput({
                    ...editCareerInput,
                    startDate: e.target.value,
                  })
                }
              />

              <label className="mb-2 block text-sm font-medium text-gray-700">
                End Date
              </label>
              <Input
                id="endDate"
                name="endDate"
                placeholder="End Date"
                type="date"
                inputSize={"small"}
                value={editCareerInput.endDate}
                onChange={(e) =>
                  setEditCareerInput({
                    ...editCareerInput,
                    endDate: e.target.value,
                  })
                }
              />
              <Button
                type="submit"
                className="hover:bg-primary-dark mt-4 w-full rounded-md bg-primary py-2 font-semibold text-white shadow-sm"
                disabled={updateExperienceLoading}
                onClick={async () => {
                  await updateExperienceHandler();
                  setEditCareerModalOpen(false);
                }}
              >
                Update Career
              </Button>
              <Button
                variant="outline"
                className="mt-2 w-full border-red-600 text-red-600 hover:bg-red-200 hover:text-red-900"
                type="button"
                disabled={deleteExperienceLoading}
                onClick={async () => {
                  await deleteExperienceHandler(editCareerInput.id);
                  setEditCareerModalOpen(false);
                }}
              >
                Delete Career
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* Edit Education Modal */}
      {isEditEducationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <button
              onClick={() => setEditEducationModalOpen(false)}
              className="absolute right-2 top-2 text-gray-600 hover:text-gray-800"
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              Edit Education
            </h2>
            <form>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Name
              </label>
              <Input
                id="name"
                name="name"
                placeholder="Name"
                type="text"
                inputSize={"small"}
                value={editEducationInput.name}
                onChange={(e) =>
                  setEditEducationInput({
                    ...editEducationInput,
                    name: e.target.value,
                  })
                }
              />

              <label className="mb-2 block text-sm font-medium text-gray-700">
                Institute
              </label>
              <Input
                id="institute"
                name="institute"
                placeholder="Institute"
                type="text"
                inputSize={"small"}
                value={editEducationInput.institute}
                onChange={(e) =>
                  setEditEducationInput({
                    ...editEducationInput,
                    institute: e.target.value,
                  })
                }
              />

              <label className="mb-2 block text-sm font-medium text-gray-700">
                Start Date
              </label>
              <Input
                id="startDate"
                name="startDate"
                placeholder="Start Date"
                type="date"
                inputSize={"small"}
                value={editEducationInput.startDate}
                onChange={(e) =>
                  setEditEducationInput({
                    ...editEducationInput,
                    startDate: e.target.value,
                  })
                }
              />

              <label className="mb-2 block text-sm font-medium text-gray-700">
                End Date
              </label>
              <Input
                id="endDate"
                name="endDate"
                placeholder="End Date"
                type="date"
                inputSize={"small"}
                value={editEducationInput.endDate}
                onChange={(e) =>
                  setEditEducationInput({
                    ...editEducationInput,
                    endDate: e.target.value,
                  })
                }
              />
              <Button
                type="submit"
                className="hover:bg-primary-dark mt-4 w-full rounded-md bg-primary py-2 font-semibold text-white shadow-sm"
                disabled={updateEducationLoading}
                onClick={async () => {
                  await updateEducationHandler();
                  setEditCareerModalOpen(false);
                }}
              >
                Update Education
              </Button>
              <Button
                variant="outline"
                className="mt-2 w-full border-red-600 text-red-600 hover:bg-red-200 hover:text-red-900"
                type="button"
                disabled={deleteEducationLoading}
                onClick={async () => {
                  await deleteEducationHandler(editEducationInput.id);
                  setEditEducationModalOpen(false);
                }}
              >
                Delete Education
              </Button>
            </form>
          </div>
        </div>
      )}
      {
        /* Edit License Modal */
        isEditLicenseModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
              <button
                onClick={() => setIsEditLicenseModalOpen(false)}
                className="absolute right-2 top-2 text-gray-600 hover:text-gray-800"
                aria-label="Close"
              >
                &times;
              </button>
              <h2 className="mb-4 text-xl font-semibold text-gray-800">
                Edit License
              </h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Name
                </label>

                <Input
                  id="name"
                  name="name"
                  placeholder="Name"
                  type="text"
                  inputSize={"small"}
                  value={editLicenseInput.name}
                  onChange={(e) =>
                    setEditLicenseInput({
                      ...editLicenseInput,
                      name: e.target.value,
                    })
                  }
                />

                <label className="mb-2 block text-sm font-medium text-gray-700">
                  License Number
                </label>
                <Input
                  id="number"
                  name="number"
                  placeholder="License Number"
                  type="text"
                  inputSize={"small"}
                  value={editLicenseInput.number}
                  onChange={(e) =>
                    setEditLicenseInput({
                      ...editLicenseInput,
                      number: e.target.value,
                    })
                  }
                />

                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Issued By
                </label>
                <Input
                  id="issuedBy"
                  name="issuedBy"
                  placeholder="Issued By"
                  type="text"
                  inputSize={"small"}
                  value={editLicenseInput.issuedBy}
                  onChange={(e) =>
                    setEditLicenseInput({
                      ...editLicenseInput,
                      issuedBy: e.target.value,
                    })
                  }
                />

                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Issued At
                </label>
                <Input
                  id="issuedAt"
                  name="issuedAt"
                  placeholder="Issued At"
                  type="date"
                  inputSize={"small"}
                  value={editLicenseInput.issuedAt}
                  onChange={(e) =>
                    setEditLicenseInput({
                      ...editLicenseInput,
                      issuedAt: e.target.value,
                    })
                  }
                />

                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Expiry Date
                </label>
                <Input
                  id="expiryDate"
                  name="expiryDate"
                  placeholder="Expiry Date"
                  type="date"
                  inputSize={"small"}
                  value={editLicenseInput.expiryDate}
                  onChange={(e) =>
                    setEditLicenseInput({
                      ...editLicenseInput,
                      expiryDate: e.target.value,
                    })
                  }
                />
                <Button
                  type="submit"
                  className="hover:bg-primary-dark mt-4 w-full rounded-md bg-primary py-2 font-semibold text-white shadow-sm"
                  disabled={editLicenseLoading}
                  onClick={async () => {
                    await updateLicenseHandler();
                    setIsEditLicenseModalOpen(false);
                  }}
                >
                  Update License
                </Button>
                <Button
                  variant="outline"
                  className="mt-2 w-full border-red-600 text-red-600 hover:bg-red-200 hover:text-red-900"
                  type="button"
                  disabled={deleteLicenseLoading}
                  onClick={async () => {
                    await deleteLicenseHandler(editLicenseInput.id);
                    setIsEditLicenseModalOpen(false);
                  }}
                >
                  Delete License
                </Button>
              </form>
            </div>
          </div>
        )
      }
    </div>
  );
}
