import Image from "next/image";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";

/**
 * Small round (LinkedIn-style) profile photo used as the site mark (navbar, footer). Falls back
 * to the monogram tile when no photo has been added to /public/images.
 */
export function Avatar({ src, className }: { src: string | null; className?: string }) {
  if (!src) {
    return (
      <span
        className={cn(
          "grid size-10 place-items-center rounded-full bg-royal text-sm font-extrabold tracking-wide text-white",
          className,
        )}
      >
        {site.monogram}
      </span>
    );
  }

  return (
    <span
      className={cn(
        "relative block size-10 shrink-0 overflow-hidden rounded-full border border-royal-200 bg-royal-100",
        className,
      )}
    >
      {/* Zoomed in on the face so it stays recognisable at 40px. */}
      <Image
        src={src}
        alt=""
        fill
        sizes="40px"
        className="origin-[62%_52%] scale-[1.7] object-cover object-top"
      />
    </span>
  );
}
