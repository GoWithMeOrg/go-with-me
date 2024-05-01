import Image from "next/image";
import Joined from "@/assets/icons/joined.svg";
import profile from "@/assets/images/profile.png";
import classes from "./UserCard.module.css";

interface CardUserProps {
    width: number;
    userName: string;
    status: string;
}
export const CardUser = ({ width, userName, status }: CardUserProps & { width: number }) => {
    return (
        <div className={classes.user}>
            <div className={classes.userAvatar}>
                <Image
                    style={{ height: "100%", objectFit: "cover", borderRadius: "50%" }}
                    width={width}
                    src={profile}
                    alt="img"
                />
                {status === "joined" && <Joined className={classes.userJoined} />}
            </div>

            <div className={classes.userName}>
                <span>{userName}</span>
                <span className={classes.userStatus}>{status}</span>
            </div>
        </div>
    );
};

export default CardUser;
