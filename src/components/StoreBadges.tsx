import Image from "next/image";

/** Official App Store / Google Play badges linking to a live listing. */
export function StoreBadges({
  appStoreUrl,
  playStoreUrl,
  className = "",
  size = "md",
}: {
  appStoreUrl: string;
  playStoreUrl: string;
  className?: string;
  size?: "sm" | "md";
}) {
  const apple = size === "sm" ? { w: 96, h: 32 } : { w: 120, h: 40 };
  const google = size === "sm" ? { w: 108, h: 42 } : { w: 135, h: 52 };
  return (
    <div className={`flex flex-wrap items-center ${size === "sm" ? "gap-2" : "gap-3"} ${className}`}>
      <a href={appStoreUrl} target="_blank" rel="noopener noreferrer" aria-label="Download on the App Store">
        <Image src="/badges/app-store.svg" alt="Download on the App Store" width={apple.w} height={apple.h} unoptimized />
      </a>
      <a href={playStoreUrl} target="_blank" rel="noopener noreferrer" aria-label="Get it on Google Play">
        <Image src="/badges/google-play.png" alt="Get it on Google Play" width={google.w} height={google.h} />
      </a>
    </div>
  );
}
