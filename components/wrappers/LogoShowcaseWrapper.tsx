import { LogoShowcase } from "@/components/LogoShowcase";
import { getLatestLogoWorks } from "@/lib/actions/portfolio";

export default async function LogoShowcaseWrapper() {
  const logoWorks = await getLatestLogoWorks();
  return <LogoShowcase logoWorks={logoWorks} />;
}
