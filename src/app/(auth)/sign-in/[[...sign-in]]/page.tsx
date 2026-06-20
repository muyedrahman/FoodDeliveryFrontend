import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-neutral p-4">
      <div className="w-full max-w-md flex flex-col gap-6 items-center">
        <SignIn
          appearance={{
            elements: {
              formButtonPrimary: "bg-primary hover:bg-primary/95 text-white",
              card: "rounded-xl shadow-md border bg-card",
            },
          }}
          path="/sign-in"
        />
      </div>
    </main>
  );
}
