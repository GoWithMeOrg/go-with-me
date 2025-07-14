import { useSession } from "next-auth/react";

export const validImageTypes = ["image/jpeg", "image/png", "image/gif"];

const { data: session } = useSession();
export const user_id = session?.user.id;
