"use client";
import { type Identifier } from "@mdn/browser-compat-data";
import CompatView from "./CompatView";
import { useMemo } from "react";

export default function IdentifierExplorer({
  name,
  entry,
}: {
  name: string;
  entry: Identifier;
}) {
  const identifierKeys = useMemo(() => {
    return Object.keys(entry).filter((key) => key !== "__compat");
  }, [entry]);

  // Remove any deprecated identifiers
  if (entry.__compat && entry.__compat.status?.deprecated === true) {
    return null;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">{name}</h1>
      {!!entry?.__compat && <CompatView compatData={entry.__compat} />}
      {identifierKeys.map((key) => (
        <IdentifierExplorer key={key} name={key} entry={entry[key]!} />
      ))}
    </div>
  );
}
