import classes from "./AuthModal.module.css";
import Google from "@/assets/icons/google.svg";
import Facebook from "@/assets/icons/facebook.svg";
import Twitter from "@/assets/icons/twitter.svg";
import Close from "@/assets/icons/close.svg";
import { FormEvent } from "react";
import { signIn } from "next-auth/react";

interface IAuthModal {
    onClose?: () => void;
}

export const AuthModal = ({ onClose }: IAuthModal) => {
    const handleClose = () => {
        if (onClose) {
            onClose();
        }
    };

    let userEmail;
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = Object.fromEntries(new FormData(e.currentTarget).entries());
        userEmail = formData.email as string;
    };

    console.log(userEmail);
    //генерируем одноразовый пароль

    let OTP;
    const generateOTP = () => {
        const digits = "0123456789";
        let OTP = "";
        for (let i = 0; i < 4; i++) {
            OTP += digits[Math.floor(Math.random() * digits.length)];
        }
        return OTP;
    };

    return (
        <div className={classes.authModal}>
            <Close className={classes.authModalClose} onClick={handleClose} />
            <div className={classes.authModalWrapper}>
                <h3 className={classes.authModalTitle}>
                    Hi! <br />
                    Log in and join the adventure
                </h3>
                <p className={classes.authModalDescription}>via Google account or social networks</p>
                <div className={classes.authModalButtons}>
                    <button className={classes.authModalButton}>
                        <Google onClick={() => signIn("google")} />
                    </button>
                    <button className={classes.authModalButton}>
                        <Facebook onClick={() => signIn("facebook")} />
                    </button>
                    <button className={classes.authModalButton}>
                        <Twitter onClick={() => signIn("twitter")} />
                    </button>
                </div>
                {/* <div className={classes.authModalFormEmail}>
                    <p className={classes.authModalDescription}>or get one-time password via email</p>
                    <form action="" onSubmit={handleSubmit}>
                        <input type="email" name="email" className={classes.authModalInput} />
                        <button type="submit" className={classes.authModalFormButton}>
                            Get password
                        </button>
                    </form>
                </div> */}

                <div className={classes.authModalFormEmail}>
                    <p className={classes.authModalDescription}> The password has been sent to qwerty@gmail.com</p>
                    <form action="" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="otp"
                            className={classes.authModalInputNumber}
                            placeholder="XXXX"
                            pattern="[0-9]{4}"
                            maxLength={4}
                        />
                        <button type="submit" className={classes.authModalFormButtonResend}>
                            Resend password &#8658;
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
