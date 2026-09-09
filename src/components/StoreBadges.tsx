import Image from "next/image";

/** Official App Store / Google Play badges linking to a live listing. */
export function StoreBadges({
  appStoreUrl,
  playStoreUrl,
  className = "",
}: {
  appStoreUrl: string;
  playStoreUrl: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <a href={appStoreUrl} target="_blank" rel="noopener noreferrer" aria-label="Download on the App Store">
        <Image src="/badges/app-store.svg" alt="Download on the App Store" width={120} height={40} unoptimized />
      </a>
      <a href={playStoreUrl} target="_blank" rel="noopener noreferrer" aria-label="Get it on Google Play">
        <Image src="/badges/google-play.png" alt="Get it on Google Play" width={135} height={52} />
      </a>
    </div>
  );
}
