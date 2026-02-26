"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { Eye, EyeOff, Loader2, BarChart3 } from "lucide-react";
import { loginApi } from "../api";
import { setApiToken, setUser } from "@/store/redux/authSlice";
import { Button } from "@/components/ui/button";

type LoginFormValues = {
  email: string;
  password: string;
};

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormValues>();

 const onSubmit = async (data: LoginFormValues) => {
  try {
    const res = await loginApi(data);

    const userData = {
      firstname: res.firstName,
      lastname: res.lastName,
    };

    localStorage.setItem("user", JSON.stringify(userData));

    if (res.token) {
      dispatch(setApiToken(res.token));
    }

    toast.success("Login successfully");
    router.push("/dashboard");
  } catch (error) {
    setError("root", {
      message: "Invalid email or password",
    });
  }
};
  return (
    <div className="min-h-screen flex w-full items-center justify-center bg-background relative overflow-hidden">
      
      {/* ===== BACKGROUND LAYER ===== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        
        {/* Radial Glow */}
        <div
          className="absolute inset-0 opacity-50"
          style={{
            background: `
              radial-gradient(circle at 25% 30%, 
                color-mix(in oklch, var(--color-primary) 45%, transparent),
                transparent 60%
              ),
              radial-gradient(circle at 75% 70%, 
                color-mix(in oklch, var(--color-accent) 60%, transparent),
                transparent 60%
              )
            `,
          }}
        />

        {/* Diagonal Grid Lines */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                45deg,
                color-mix(in oklch, var(--color-primary) 40%, transparent),
                color-mix(in oklch, var(--color-primary) 40%, transparent) 1px,
                transparent 1px,
                transparent 40px
              ),
              repeating-linear-gradient(
                -45deg,
                color-mix(in oklch, var(--color-accent) 40%, transparent),
                color-mix(in oklch, var(--color-accent) 40%, transparent) 1px,
                transparent 1px,
                transparent 40px
              )
            `,
          }}
        />
      </div>

      {/* ===== LOGIN CARD ===== */}
      <div className="w-full max-w-md relative z-10">
        
        {/* Logo */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-lg bg-gradient-to-br from-primary to-accent text-primary-foreground mb-4 relative">
            <BarChart3 className="w-7 h-7" />
            <div className="absolute inset-0 rounded-lg border border-primary/20 animate-pulse"></div>
          </div>
          <h1 className="text-4xl font-black tracking-tight">
            LEAD BOOST
          </h1>
        </div>

        {/* Form */}
        <div className="border border-primary/30 rounded-2xl p-8 bg-background/60 backdrop-blur-md space-y-6 shadow-xl">
          <h2 className="text-2xl font-semibold text-center">
            Log In
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            {/* Email */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest">
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                disabled={isSubmitting}
                {...register("email", {
                  required: "Email is required",
                })}
                className={`w-full px-4 py-3 border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                  errors.email ? "border-destructive" : "border-primary/20"
                }`}
              />
              {errors.email && (
                <p className="text-destructive text-xs">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  disabled={isSubmitting}
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className={`w-full px-4 py-3 border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                    errors.password ? "border-destructive" : "border-primary/20"
                  }`}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-3.5 text-muted-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>

              {errors.password && (
                <p className="text-destructive text-xs">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Root Error */}
            {errors.root && (
              <p className="text-destructive text-sm text-center">
                {errors.root.message}
              </p>
            )}

            {/* Submit */}
            <Button
              type="submit"
              disabled={isSubmitting}
              variant="default"
              className="w-full flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Log In"
              )}
            </Button>
          </form>
        </div>

        <div className="text-center mt-8 text-xs text-muted-foreground font-mono">
          Secure Connection • End-to-End Encrypted
        </div>
      </div>
    </div>
  );
}