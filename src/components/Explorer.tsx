"use client";

import bcd, {
  Identifier,
  type BrowserName,
  type CompatData,
} from "@mdn/browser-compat-data" with { type: "json" };
import { useMemo, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import IdentifierExplorer from "./IdentifierExplorer";
import BrowserPicker from "./BrowserPicker";

const categories: (keyof CompatData)[] = [
  "api",
  "css",
  "html",
  "http",
  "javascript",
  "mathml",
  "svg",
  "webassembly",
  "webdriver",
  "webextensions",
];

type ValidCategory = keyof Omit<CompatData, "browsers" | "__meta">;

// const filterDeprecated = (data: Identifier): Identifier | null => {
//   if (data.__compat?.status?.deprecated === true) {
//     return null;
//   }

//   const filteredData: Identifier = {};

//   for (const [key, value] of Object.entries(data)) {
//     if (key === "__compat") {
//       filteredData[key] = value;
//     } else if (typeof value === "object") {
//       const filteredChild = filterDeprecated(value as Identifier);
//       if (filteredChild !== null) {
//         filteredData[key] = filteredChild;
//       }
//     }
//   }

//   return Object.keys(filteredData).length > 0 ? filteredData : null;
// };

// const filterCompatibleEntries = (
//   data: Identifier,
//   selectedBrowsers: Map<BrowserName, string>,
// ) => {
//   if (data.__compat) {
//     selectedBrowsers.forEach((version, browser) => {
//       if(!data?.__compat?.support[browser] ||
//     });
//     return data.__compat.support;
//   }
//   return data;
// };

export default function Explorer() {
  const [category, setCategory] = useState<ValidCategory>("html");
  const [selectedBrowsers, setSelectedBrowsers] = useState(
    new Map<BrowserName, string>(),
  );

  const categoryData = useMemo(() => bcd[category], [category]);

  return (
    <div>
      <Select
        value={category}
        onValueChange={(value) => setCategory(value as ValidCategory)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <BrowserPicker
        onChange={(selectedBrowsers) => setSelectedBrowsers(selectedBrowsers)}
      />

      <IdentifierExplorer name={category} entry={categoryData} />
    </div>
  );
}
