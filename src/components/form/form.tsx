import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginSchemaType } from "../../models";
import { formData as data } from "../../data/form";
import { clsx } from "clsx";
import styles from "./form.module.css";

type StatusType = {
  state: "idle" | "pending" | "error";
  message: string;
};

export function Form() {
  const [status, setStatus] = useState<StatusType>({
    state: "idle",
    message: "",
  });
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginSchemaType) => {
    setStatus({ message: "", state: "pending" });
    const error = await login(data);

    if (error) {
      setStatus({
        state: "error",
        message: error,
      });
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, []);

  return (
    <section className={styles.wrapper}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <h1 className={styles.title}>{data.header}</h1>

        <div className={styles.inputWrapper}>
          <div>
            <label htmlFor="username" className="visuallyHidden">
              {data.labels.username}
            </label>
            <input
              {...register("username", { required: true })}
              type="email"
              className={styles.input}
              placeholder={data.placeholders.username}
            />
            {errors.username && (
              <p className={styles.error}>{errors.username.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="visuallyHidden">
              {data.labels.password}
            </label>
            <input
              {...register("password", { required: true })}
              type="password"
              className={styles.input}
              placeholder={data.placeholders.password}
            />
            {errors.password && (
              <p className={styles.error}>{errors.password.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="shouldRememberUser"
              className={styles.checkboxLabel}
            >
              <input
                {...register("shouldRememberUser")}
                type="checkbox"
                className={styles.checkbox}
              />
              <span className={styles.checkboxText}>
                {data.labels.remember}
              </span>
            </label>
          </div>
        </div>

        {status.state === "error" && (
          <p className={styles.error}>{status.message}</p>
        )}

        <button
          type="submit"
          disabled={status.state === "pending"}
          className={clsx(
            styles.button,
            status.state === "pending" && [styles.loading, "loadingText"]
          )}
        >
          {data.loginLabel}
        </button>
      </form>
    </section>
  );
}
