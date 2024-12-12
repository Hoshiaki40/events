import Link from "next/link";
import { GithubIcon } from "@/components/icons";
import { subtitle, title } from "@/components/primitives";

import { siteConfig } from "@/config/site";
import { buttonVariants } from "@/src/presentation/components/ui/button";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl justify-center text-center">
        <span className={title()}>Make&nbsp;</span>
        <span className={title({ color: "violet" })}>beautiful&nbsp;</span>
        <br />
        <span className={title()}>
          websites regardless of your design experience.
        </span>
        <div className={subtitle({ class: "mt-4" })}>
          Beautiful, fast and modern React UI library.
        </div>
      </div>

      <div className="flex gap-3">
        <Link
          className={buttonVariants({
            variant: "default",
          })}
          href={siteConfig.links.docs}
        >
          Documentation
        </Link>
        <Link
          className={buttonVariants({
            variant: "link",
          })}
          href={siteConfig.links.github}
        >
          <GithubIcon size={20} />
          GitHub
        </Link>
      </div>
    </section>
  );
}
