// import { z } from "zod";
// import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
// import bcd, { type Identifier } from "@mdn/browser-compat-data";

// export const compatRouter = createTRPCRouter({
//   getCompatibleEntries: publicProcedure
//     .input(
//       z.object({
//         browsers: z.array(z.string()),
//       }),
//     )
//     .query(({ input }) => {
//       const compatibleEntries: string[] = [];

//       const checkCompatibility = (data: Identifier, path: string) => {
//         if (data.__compat) {
//           const isCompatible = input.browsers.every((browser) => {
//             const [name, version] = browser.split(" ");
//             return (
//               data.__compat.support[name]?.version_added &&
//               (version
//                 ? data.__compat.support[name].version_added <= version
//                 : true)
//             );
//           });

//           if (isCompatible) {
//             compatibleEntries.push(path);
//           }
//         }

//         for (const key in data) {
//           if (key !== "__compat") {
//             checkCompatibility(data[key], `${path}${path ? "." : ""}${key}`);
//           }
//         }
//       };

//       checkCompatibility(bcd, "");

//       return compatibleEntries;
//     }),
// });
