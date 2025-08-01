// // pages/NewCall.tsx
// import { useEffect, useState } from "react";
// import { useStreamVideoClient } from "@stream-io/video-react-sdk";
// import { useRouter } from "next/router";
// import { useMutation } from "convex/react";
// import { api } from "../../../convex/_generated/api";
// import { useUser } from "@clerk/nextjs";  // 👈 ye import karo top pe

// const { user } = useUser(); 


// export default function NewCallPage() {
//   const client = useStreamVideoClient();
//   const router = useRouter();
//   const [callId, setCallId] = useState("");
//   const createInterview = useMutation(api.interviews.createInterview);

//   useEffect(() => {
//     const createInstantCall = async () => {
//       if (!client) return;

//       const randomId = `call-${Date.now()}`;
//       const call = client.call("default", randomId);
//       await call.getOrCreate({});

//       setCallId(randomId);

//       if (!user?.id) return; // user not logged in or ID unavailable

//         await createInterview({
//         title: "Instant Call",
//         streamCallId: randomId,
//         startTime: Date.now(),
//         status: "active",
//         candidateId: user.id,      // Now it's guaranteed to be string
//         interviewerIds: [],
//         });

//       // Auto-redirect
//       router.push(`/call/${randomId}`);
//     };

//     createInstantCall();
//   }, [client]);

//   return (
//     <div className="p-6 text-center">
//       <h2 className="text-xl font-bold mb-4">Creating Call...</h2>
//       {callId && (
//         <>
//           <p>Call ID: {callId}</p>
//           <button
//             onClick={() => router.push(`/call/${callId}`)}
//             className="bg-green-600 text-white p-2 rounded mt-4"
//           >
//             Join Now
//           </button>
//         </>
//       )}
//     </div>
//   );
// }




"use client";

import { useEffect, useState } from "react";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useUser } from "@clerk/nextjs"; // ✅ import Clerk user

export default function NewCallPage() {
  const client = useStreamVideoClient();
  const router = useRouter();
  const [callId, setCallId] = useState("");
  const createInterview = useMutation(api.interviews.createInterview);
  const { user } = useUser(); // ✅ get logged-in user

  useEffect(() => {
    const createInstantCall = async () => {
      if (!client || !user?.id) return; // check for client and user

      const randomId = `call-${Date.now()}`;
      const call = client.call("default", randomId);
      await call.getOrCreate({});

      setCallId(randomId);

      // ✅ Creating interview record in Convex
      await createInterview({
        title: "Instant Call",
        streamCallId: randomId,
        startTime: Date.now(),
        status: "active",
        candidateId: user.id,
        interviewerIds: [],
      });

      // ✅ Redirect to call page
      router.push(`/call/${randomId}`);
    };

    createInstantCall();
  }, [client, user]);

  return (
    <div className="p-6 text-center">
      <h2 className="text-xl font-bold mb-4">Creating Call...</h2>
      {callId && (
        <>
          <p>Call ID: {callId}</p>
          <button
            onClick={() => router.push(`/call/${callId}`)}
            className="bg-green-600 text-white p-2 rounded mt-4"
          >
            Join Meeting
          </button>
        </>
      )}
    </div>
  );
}
