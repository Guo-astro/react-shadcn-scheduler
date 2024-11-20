import { SchedulerProvider } from "../providers/schedular-provider";
import SchedulerWrapper from "./schedular-wrapper";

export function ReactShadcnScheduler() {
  return (
    <section className="flex w-full flex-col items-center justify-center gap-4 py-8 md:py-10">
      <SchedulerProvider weekStartsOn="monday">
        <SchedulerWrapper />
      </SchedulerProvider>
    </section>
  );
}
