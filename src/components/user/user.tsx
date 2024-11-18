import { useEffect, useState } from "react";
import { useAuth } from "../../hooks";
import { LogoutButton } from "../logout-button";
import { Loader } from "../loader";
import { mockDelay } from "../../lib";
import { userData as data } from "../../data/user";
import styles from "./user.module.css";

export function User() {
  const [userInfo, setUserInfo] = useState<{ user: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { redirectToLogin } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        await mockDelay();
        const res = await fetch("/api/user");

        if (res.status === 401) {
          redirectToLogin();
          return;
        }

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error);
        }

        const data = await res.json();
        setUserInfo(data as unknown as { user: string });
      } catch (error) {
        if (error instanceof Error) {
          if (error instanceof Error) {
            setError(error.message);
          }

          setError("Unexpected error occurred.");
        }
      }
    };

    fetchUserData();
  }, []);

  return (
    <section className={styles.wrapper}>
      {!userInfo && error === null && <Loader />}

      {userInfo && (
        <>
          <p>{`${data.greeting} ${userInfo.user}`}</p>
          <LogoutButton>{data.logoutLabel}</LogoutButton>
        </>
      )}

      {error && <p className={styles.error}>{error}</p>}
    </section>
  );
}
