import { FormEvent } from "react";
import { signIn } from "next-auth/react";

import { Title } from "@/components/shared/Title";
import { Button } from "@/components/shared/Button";

import Google from "@/assets/icons/google.svg";
import Close from "@/assets/icons/close.svg";

import classes from "./AuthModal.module.css";

interface IAuthModal {
    onClose?: () => void;
}

export const AuthModal = ({ onClose }: IAuthModal) => {
    const handleClose = () => {
        if (onClose) {
            onClose?.();
        }
    };

    let userEmail;
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = Object.fromEntries(new FormData(e.currentTarget).entries());
        userEmail = formData.email as string;
    };

    return (
        <div className={classes.authModal}>
            <Close className={classes.authModalClose} onClick={handleClose} />
            <div className={classes.authModalWrapper}>
                <Title className={classes.authModalTitle} tag={"h3"}>
                    Войдите в систему и присоединяйтесь к приключениям
                </Title>
                <p className={classes.authModalDescription}>войти с помощью Google {/* or social networks */}</p>
                <div className={classes.authModalButtons}>
                    <Button className={classes.authModalButton} onClick={() => signIn("google")}>
                        <Google />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
