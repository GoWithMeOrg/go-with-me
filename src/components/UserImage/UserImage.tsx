import React from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";

export interface UserImageProps {
    className?: string;
}

export const UserImage = ({ className }: UserImageProps) => {
    const { data: session } = useSession();

    return (
        <div>
            <Image src={session?.user?.image || ""} className={className} alt="my profile" width={50} height={50} />
        </div>
    );
};

export default UserImage;
