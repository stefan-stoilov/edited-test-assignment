import { useState, type PropsWithChildren } from "react";
import { useAuth } from "../../hooks";
import { clsx } from "clsx";
import styles from "./logout-button.module.css";

type LogoutStateType = {
  state: "idle" | "pending" | "error";
  message: string;
};

export function LogoutButton({ children }: PropsWithChildren) {
  const { logout } = useAuth();
  const [logoutState, setLogoutState] = useState<LogoutStateType>({
    state: "idle",
    message: "",
  });

  const handleClick = async () => {
    setLogoutState({ state: "pending", message: "" });
    const error = await logout();

    if (typeof error !== "undefined") {
      setLogoutState({ state: "error", message: error });
    }
  };

  return (
    <>
      <button
        disabled={logoutState.state === "pending"}
        className={clsx(
          styles.button,
          logoutState.state === "pending" && [styles.loading, "loadingText"]
        )}
        onClick={handleClick}
      >
        {children}
      </button>
      {logoutState.state === "error" && (
        <p className={styles.error}>{logoutState.message}</p>
      )}
    </>
  );
}
