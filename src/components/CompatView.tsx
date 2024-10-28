"use client";
import {
  type SimpleSupportStatement,
  type CompatStatement,
} from "@mdn/browser-compat-data";
import Link from "next/link";

export default function CompatView({
  compatData,
}: {
  compatData: CompatStatement;
}) {
  return (
    <div>
      <h2>
        <Link href={compatData.mdn_url ?? "#"}>{compatData.description}</Link>
      </h2>
      <div className="flex flex-wrap gap-2">
        {Object.entries(compatData.support).map(([browserId, support]) => (
          <div className="flex flex-wrap gap-2" key={browserId}>
            <h2>{browserId}</h2>
            <div className="flex flex-wrap gap-2">
              {Array.isArray(support) ? (
                support.map((status) => (
                  <SimpleSupportStatement
                    key={`${browserId}-${status.version_added}`}
                    support={status}
                  />
                ))
              ) : (
                <SimpleSupportStatement support={support} />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SimpleSupportStatement({
  support,
}: {
  support: SimpleSupportStatement;
}) {
  return (
    <div>
      {support.version_added}
      {support.version_removed && ` (removed in ${support.version_removed})`}
    </div>
  );
}
