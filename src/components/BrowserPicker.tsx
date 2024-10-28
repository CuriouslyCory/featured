"use client";

import { useEffect, useState } from "react";
import bcd, {
  type BrowserName,
} from "@mdn/browser-compat-data" with { type: "json" };
import { Checkbox } from "~/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const browsers = bcd.browsers;
const browserNames = Object.keys(browsers) as BrowserName[];

function getCurrentReleaseKey(browserName: BrowserName) {
  return Object.keys(browsers[browserName].releases).find(
    (key) => browsers[browserName].releases[key]!.status === "current",
  )!;
}

const defaultSelectedBrowsers = new Map<BrowserName, string>([
  ["chrome", getCurrentReleaseKey("chrome")],
  ["chrome_android", getCurrentReleaseKey("chrome_android")],
  ["firefox", getCurrentReleaseKey("firefox")],
  ["safari", getCurrentReleaseKey("safari")],
  ["safari_ios", getCurrentReleaseKey("safari_ios")],
]);

const BrowserPicker = ({
  onChange,
}: {
  onChange?: (selectedBrowsers: Map<BrowserName, string>) => void;
}) => {
  const [selectedBrowsers, setSelectedBrowsers] = useState<
    Map<BrowserName, string>
  >(defaultSelectedBrowsers);

  const handleCheckboxChange = (browserId: BrowserName) => {
    setSelectedBrowsers((prev) => {
      const newSelectedBrowsers = new Map(prev);
      if (newSelectedBrowsers.has(browserId)) {
        newSelectedBrowsers.delete(browserId);
      } else {
        const currentReleaseKey = Object.keys(
          browsers[browserId].releases,
        ).find(
          (key) => browsers[browserId].releases[key]!.status === "current",
        );
        newSelectedBrowsers.set(browserId, currentReleaseKey ?? "");
      }
      console.log(newSelectedBrowsers);
      return newSelectedBrowsers;
    });
  };

  const handleVersionChange = (browserId: BrowserName, value: string) => {
    setSelectedBrowsers((prev) => {
      const newSelectedBrowsers = new Map(prev);
      newSelectedBrowsers.set(browserId, value);
      console.log(newSelectedBrowsers);
      return newSelectedBrowsers;
    });
  };

  useEffect(() => {
    onChange?.(selectedBrowsers);
  }, [onChange, selectedBrowsers]);

  return (
    <div className="flex gap-x-2">
      {browserNames.map((browserId) => {
        const browser = browsers[browserId];
        const currentReleaseKey = getCurrentReleaseKey(browserId);
        return (
          <div key={browserId} className="flex flex-col">
            <Checkbox
              id={`checkbox-${browserId}`}
              checked={selectedBrowsers.has(browserId)}
              onCheckedChange={() => handleCheckboxChange(browserId)}
            />
            <label
              htmlFor={`checkbox-${browserId}`}
              style={{ marginRight: "8px" }}
            >
              {browser.name}
            </label>
            <Select
              value={selectedBrowsers.get(browserId) ?? currentReleaseKey}
              onValueChange={(value) => handleVersionChange(browserId, value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a version" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(browser.releases).map((releaseKey) => (
                  <SelectItem
                    key={releaseKey}
                    value={
                      browser.releases[releaseKey]?.release_date ?? releaseKey
                    }
                  >
                    {releaseKey}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );
      })}
    </div>
  );
};

export default BrowserPicker;
