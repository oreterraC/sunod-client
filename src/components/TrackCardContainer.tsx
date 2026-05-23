import type { ReactNode } from "react";

interface Properties {
  children: ReactNode;
}

const TrackCardContainer = ({ children }: Properties) => {
  return <div className="rounded-lg overflow-hidden">{children}</div>;
};

export default TrackCardContainer;
