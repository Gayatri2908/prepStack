// import { v } from "convex/values";
// import { mutation, query } from "./_generated/server";

// // Get all interviews
// export const getAllInterviews = query({
//   handler: async (ctx) => {
//     const identity = ctx.auth.getUserIdentity();
//     if (!identity) throw new Error("user not authenticated");

//     return await ctx.db.query("interviews").collect();
//   },
// });

// // Get only MY interviews
// export const getMyInterviews = query({
//   handler: async (ctx) => {
//     const identity = await ctx.auth.getUserIdentity();
//     if (!identity) return [];

//     // Fetch the user record from the users table
//     const user = await ctx.db
//       .query("users")
//       .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
//       .unique();

//     if (!user) return [];

//     return await ctx.db
//       .query("interviews")
//       .withIndex("by_candidate_id", (q) => q.eq("candidateId", user._id))
//       .collect();
//   },
// });

// // Get interview by Stream Call ID
// export const getInterviewByStreamCallId = query({
//   args: {
//     streamCallId: v.string(),
//   },
//   handler: async (ctx, args) => {
//     const interviews = await ctx.db
//       .query("interviews")
//       .withIndex("by_stream_call_id", (q) =>
//         q.eq("streamCallId", args.streamCallId)
//       )
//       .collect();
//     return interviews;
//   },
// });

// // Create interview
// export const createInterview = mutation({
//   args: {
//     title: v.string(),
//     description: v.optional(v.string()),
//     startTime: v.string(),
//     endTime: v.optional(v.string()),
//     status: v.string(),
//     streamCallId: v.string(),
//     candidateId: v.optional(v.id("users")), // ✅ fix
//     interviewerIds: v.optional(v.array(v.id("users"))), // ✅ fix
//   },
//   handler: async (ctx, args) => {
//     const identity = await ctx.auth.getUserIdentity();
//     if (!identity) throw new Error("user not authenticated");

//     return await ctx.db.insert("interviews", {
//       ...args,
//       createdBy: identity.subject,
//     });
//   },
// });

// // Update status
// export const updateIterviewStatus = mutation({
//   args: {
//     id: v.id("interviews"),
//     status: v.string(),
//   },
//   handler: async (ctx, args) => {
//     return await ctx.db.patch(args.id, {
//       status: args.status,
//       ...(args.status === "completed"
//         ? { endTime: Date.now().toString() }
//         : {}),
//     });
//   },
// });




import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getAllInterviews = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const interviews = await ctx.db.query("interviews").collect();

    return interviews;
  },
});

export const getMyInterviews = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    const interviews = await ctx.db
      .query("interviews")
      .withIndex("by_candidate_id", (q) => q.eq("candidateId", identity.subject))
      .collect();

    return interviews!;
  },
});

export const getInterviewByStreamCallId = query({
  args: { streamCallId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("interviews")
      .withIndex("by_stream_call_id", (q) => q.eq("streamCallId", args.streamCallId))
      .first();
  },
});

export const createInterview = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
    startTime: v.number(),
    status: v.string(),
    streamCallId: v.string(),
    candidateId: v.string(),
    interviewerIds: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    return await ctx.db.insert("interviews", {
      ...args,
    });
  },
});

export const updateInterviewStatus = mutation({
  args: {
    id: v.id("interviews"),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args.id, {
      status: args.status,
      ...(args.status === "completed" ? { endTime: Date.now() } : {}),
    });
  },
});
