import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Redirect() {
  const router = useRouter();

  useEffect(() => {
    const handleReload = () => {
      if (window.location.pathname !== "/") {
        router.replace("/");
      }
    };

    // Attach the event listener
    window.addEventListener("load", handleReload);

    // Cleanup to remove the event listener
    return () => {
      window.removeEventListener("load", handleReload);
    };
  }, [router]);

  return null;
}