import { MVArtworks } from "@/components/MVArtworks";
import { getLatestMvArtworks } from "@/lib/actions/portfolio";

export default async function MVArtworksWrapper() {
  const mvArtworks = await getLatestMvArtworks();
  return <MVArtworks mvArtworks={mvArtworks} />;
}
