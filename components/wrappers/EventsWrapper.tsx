import { Events } from "@/components/Events";
import { getLatestEvents } from "@/lib/actions/portfolio";

export default async function EventsWrapper() {
  const events = await getLatestEvents();
  return <Events events={events} />;
}
