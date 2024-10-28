"use client";
import bcd, { type BrowserName } from "@mdn/browser-compat-data";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

const browsers = Object.keys(bcd.browsers);

export default function BrowsersPage() {
  const [browser, setBrowser] = useState<BrowserName>("chrome");

  return (
    <main>
      <Select
        value={browser}
        onValueChange={(value) => setBrowser(value as BrowserName)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select a browser" />
        </SelectTrigger>
        <SelectContent>
          {browsers.map((browser) => (
            <SelectItem key={browser} value={browser}>
              {browser}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div>
        <pre>{JSON.stringify(bcd.browsers[browser], null, 2)}</pre>
      </div>
    </main>
  );
}
