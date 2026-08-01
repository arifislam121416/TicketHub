import Image from "next/image";
import { headers } from "next/headers";
import { auth } from "@/app/lib/auth";
import { Calendar, Card, Chip } from "@heroui/react";
import { BiUser } from "react-icons/bi";
import { RiMvAiLine } from "react-icons/ri";
import { ShieldCheck } from "@gravity-ui/icons";


const VendorProfilePage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <Card className="shadow-xl border">
      
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Profile Image */}
            <div className="relative w-36 h-36">
              <Image
                src={user?.image || "/profile.png"}
                alt={user?.name || "Vendor"}
                fill
                className="rounded-full object-cover border-4 border-primary"
              />
            </div>

            {/* Profile Info */}
            <div className="flex-1 space-y-5">
              <div>
                <h1 className="text-3xl font-bold">
                  {user?.name}
                </h1>

                <Chip
                  color="success"
                  variant="flat"
                  className="mt-2"
                >
                  Vendor
                </Chip>
              </div>

              

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <div className="flex items-center gap-3">
                  <BiUser className="text-primary" size={22} />
                  <div>
                    <p className="text-sm text-default-500">
                      Full Name
                    </p>
                    <p className="font-semibold">
                      {user?.name}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <RiMvAiLine className="text-primary" size={22} />
                  <div>
                    <p className="text-sm text-default-500">
                      Email
                    </p>
                    <p className="font-semibold">
                      {user?.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <ShieldCheck className="text-primary" size={22} />
                  <div>
                    <p className="text-sm text-default-500">
                      Role
                    </p>
                    <p className="font-semibold">
                      {user?.role || "Vendor"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="text-primary" size={22} />
                  <div>
                    <p className="text-sm text-default-500">
                      Joined
                    </p>
                    <p className="font-semibold">
                      {user?.createdAt
                        ? new Date(user.createdAt).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        
      </Card>
    </div>
  );
};

export default VendorProfilePage;