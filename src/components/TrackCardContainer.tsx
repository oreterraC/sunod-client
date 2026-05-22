import type { ReactNode } from "react";

interface Properties {
  children: ReactNode;
}

const TrackCardContainer = ({ children }: Properties) => {
  return <div className="bg-gray-400 rounded-sm">{children}</div>;
};

export default TrackCardContainer;
