import bcd from "@mdn/browser-compat-data";

export default function RawPage() {
  return (
    <div>
      <pre>{JSON.stringify(bcd.css["at-rules"], null, 2)}</pre>
    </div>
  );
}
