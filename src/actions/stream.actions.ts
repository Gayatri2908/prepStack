// "use server";

// import { currentUser } from "@clerk/nextjs/server";
// import { StreamClient } from "@stream-io/node-sdk";

// export const streamTokenProvider = async (): Promise<string> => {
//   const user = await currentUser();

//   if (!user) {
//     console.error("User is not authenticated");
//     throw new Error("User is not authenticated");
//   }

//   const streamClient = new StreamClient(
//     process.env.NEXT_PUBLIC_STREAM_API_KEY!,
//     process.env.STREAM_SECRET_KEY!
//   );

//   // Correct usage: Pass an object with 'user_id' key
//   return streamClient.generateUserToken({ user_id: user.id });
// };


"use server";

import { currentUser } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";

export const streamTokenProvider = async (): Promise<string> => {
  const user = await currentUser();

  if (!user || !user.id) {
    console.error("User not authenticated or missing ID");
    throw new Error("User not authenticated or missing ID");
  }

  const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
  const secretKey = process.env.STREAM_SECRET_KEY;

  if (!apiKey || !secretKey) {
    console.error("Stream API keys are missing");
    throw new Error("Stream API keys are missing");
  }

  const streamClient = new StreamClient(apiKey, secretKey);

  try {
    // user.id is a string (e.g., "user_abc123")
    const token = streamClient.generateUserToken({ user_id: user.id });
    return token;
  } catch (error) {
    console.error("Error generating Stream token:", error);
    throw new Error("Failed to generate Stream token");
  }
};
