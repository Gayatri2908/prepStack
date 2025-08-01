// // import { useUser } from "@clerk/nextjs";
// // import { useStreamVideoClient } from "@stream-io/video-react-sdk";
// // import { useMutation, useQuery } from "convex/react";
// // import { useState } from "react";
// // import { api } from "../../../../convex/_generated/api";
// // import toast from "react-hot-toast";
// // import {
// //   Dialog,
// //   DialogHeader,
// //   DialogTitle,
// //   DialogTrigger,
// //   DialogContent,
// // } from "@/components/ui/dialog";
// // import { Button } from "@/components/ui/button";
// // import { Input } from "@/components/ui/input";
// // import { Textarea } from "@/components/ui/textarea";
// // import {
// //   Select,
// //   SelectContent,
// //   SelectItem,
// //   SelectTrigger,
// //   SelectValue,
// // } from "@/components/ui/select";
// // import UserInfo from "@/components/UserInfo";
// // import { Loader2Icon, XIcon } from "lucide-react";
// // import { Calendar } from "@/components/ui/calendar";
// // import { TIME_SLOTS } from "@/constants";
// // import MeetingCard from "@/components/MeetingCard";

// // function InterviewScheduleUI() {
// //   const client = useStreamVideoClient();
// //   const { user } = useUser();
// //   const [open, setOpen] = useState(false);
// //   const [isCreating, setIsCreating] = useState(false);

// //   const interviews = useQuery(api.interviews.getAllInterviews) ?? [];
// //   const users = useQuery(api.users.getUsers) ?? [];
  
// //   // console.log("all users")
// //   // console.log(users);
// //   const createInterview = useMutation(api.interviews.createInterview);

// //   const candidates = users?.filter((u) => u.role === "candidate");
// //   const interviewers = users?.filter((u) => u.role === "interviewer");

// //   const [formData, setFormData] = useState({
// //     title: "",
// //     description: "",
// //     date: new Date(),
// //     time: "09:00",
// //     candidateId: "",
// //     interviewerIds: user?.id ? [user.id] : [],
// //   });

// //   const scheduleMeeting = async () => {
// //     if (!client || !user) return;
// //     if (!formData.candidateId || formData.interviewerIds.length === 0) {
// //       toast.error("Please select both candidate and at least one interviewer");
// //       return;
// //     }

// //     setIsCreating(true);

// //     try {
// //       const { title, description, date, time, candidateId, interviewerIds } = formData;
// //       const [hours, minutes] = time.split(":");
// //       const meetingDate = new Date(date);
// //       meetingDate.setHours(parseInt(hours), parseInt(minutes), 0);

// //       const id = crypto.randomUUID();
// //       const call = client.call("default", id);

// //       await call.getOrCreate({
// //         data: {
// //           starts_at: meetingDate.toISOString(),
// //           custom: {
// //             description: title,
// //             additionalDetails: description,
// //           },
// //         },
// //       });

// //       await createInterview({
// //         title,
// //         description,
// //         startTime: String(meetingDate.getTime()),
// //         status: "upcoming",
// //         streamCallId: id,
// //         candidateId,
// //         interviewerIds,
// //       });

// //       setOpen(false);
// //       toast.success("Meeting scheduled successfully!");

// //       setFormData({
// //         title: "",
// //         description: "",
// //         date: new Date(),
// //         time: "09:00",
// //         candidateId: "",
// //         interviewerIds: user?.id ? [user.id] : [],
// //       });
// //     } catch (error) {
// //       console.error(error);
// //       toast.error("Failed to schedule meeting. Please try again.");
// //     } finally {
// //       setIsCreating(false);
// //     }
// //   };

// //   const addInterviewer = (interviewerId: string) => {
// //     if (!formData.interviewerIds.includes(interviewerId)) {
// //       setFormData((prev) => ({
// //         ...prev,
// //         interviewerIds: [...prev.interviewerIds, interviewerId],
// //       }));
// //     }
// //   };

// //   const removeInterviewer = (interviewerId: string) => {
// //     if (interviewerId === user?.id) return;
// //     setFormData((prev) => ({
// //       ...prev,
// //       interviewerIds: prev.interviewerIds.filter((id) => id !== interviewerId),
// //     }));
// //   };

// //   const selectedInterviewers = interviewers.filter((i) =>
// //     formData.interviewerIds.includes(i.clerkId)
// //   );

// //   const availableInterviewers = interviewers.filter(
// //     (i) => !formData.interviewerIds.includes(i.clerkId)
// //   );

// //   return (
// //     <div className="container max-w-7xl mx-auto p-6 space-y-8">
// //       <div className="flex items-center justify-between">
// //         {/* HEADER INFO */}
// //         <div>
// //           <h1 className="text-3xl font-bold">Interviews</h1>
// //           <p className="text-muted-foreground mt-1">Schedule and manage interviews</p>
// //         </div>

// //         {/* DIALOG */}

// //         <Dialog open={open} onOpenChange={setOpen}>
// //           <DialogTrigger asChild>
// //             <Button size="lg">Schedule Interview</Button>
// //           </DialogTrigger>

// //           <DialogContent className="sm:max-w-[500px] h-[calc(100vh-200px)] overflow-auto">
// //             <DialogHeader>
// //               <DialogTitle>Schedule Interview</DialogTitle>
// //             </DialogHeader>
// //             <div className="space-y-4 py-4">
// //               {/* INTERVIEW TITLE */}
// //               <div className="space-y-2">
// //                 <label className="text-sm font-medium">Title</label>
// //                 <Input
// //                   placeholder="Interview title"
// //                   value={formData.title}
// //                   onChange={(e) => setFormData({ ...formData, title: e.target.value })}
// //                 />
// //               </div>

// //               {/* INTERVIEW DESC */}
// //               <div className="space-y-2">
// //                 <label className="text-sm font-medium">Description</label>
// //                 <Textarea
// //                   placeholder="Interview description"
// //                   value={formData.description}
// //                   onChange={(e) => setFormData({ ...formData, description: e.target.value })}
// //                   rows={3}
// //                 />
// //               </div>

// //               {/* CANDIDATE */}
// //               <div className="space-y-2">
// //                 <label className="text-sm font-medium">Candidate</label>
// //                 <Select
// //                   value={formData.candidateId}
// //                   onValueChange={(candidateId) => setFormData({ ...formData, candidateId })}
// //                 >
// //                   <SelectTrigger>
// //                     <SelectValue placeholder="Select candidate" />
// //                   </SelectTrigger>
// //                   <SelectContent>
// //                     {candidates.map((candidate) => (
// //                       <SelectItem key={candidate.clerkId} value={candidate.clerkId}>
// //                         <UserInfo user={candidate} />
// //                       </SelectItem>
// //                     ))}
// //                   </SelectContent>
// //                 </Select>
// //               </div>

// //               {/* INTERVIEWERS */}
// //               <div className="space-y-2">
// //                 <label className="text-sm font-medium">Interviewers</label>
// //                 <div className="flex flex-wrap gap-2 mb-2">
// //                   {selectedInterviewers.map((interviewer) => (
// //                     <div
// //                       key={interviewer.clerkId}
// //                       className="inline-flex items-center gap-2 bg-secondary px-2 py-1 rounded-md text-sm"
// //                     >
// //                       <UserInfo user={interviewer} />
// //                       {interviewer.clerkId !== user?.id && (
// //                         <button
// //                           onClick={() => removeInterviewer(interviewer.clerkId)}
// //                           className="hover:text-destructive transition-colors"
// //                         >
// //                           <XIcon className="h-4 w-4" />
// //                         </button>
// //                       )}
// //                     </div>
// //                   ))}
// //                 </div>
// //                 {availableInterviewers.length > 0 && (
// //                   <Select onValueChange={addInterviewer}>
// //                     <SelectTrigger>
// //                       <SelectValue placeholder="Add interviewer" />
// //                     </SelectTrigger>
// //                     <SelectContent>
// //                       {availableInterviewers.map((interviewer) => (
// //                         <SelectItem key={interviewer.clerkId} value={interviewer.clerkId}>
// //                           <UserInfo user={interviewer} />
// //                         </SelectItem>
// //                       ))}
// //                     </SelectContent>
// //                   </Select>
// //                 )}
// //               </div>

// //               {/* DATE & TIME */}
// //               <div className="flex gap-4">
// //                 {/* CALENDAR */}
// //                 <div className="space-y-2">
// //                   <label className="text-sm font-medium">Date</label>
// //                   <Calendar
// //                     mode="single"
// //                     selected={formData.date}
// //                     onSelect={(date) => date && setFormData({ ...formData, date })}
// //                     disabled={(date) => date < new Date()}
// //                     className="rounded-md border"
// //                   />
// //                 </div>

// //                 {/* TIME */}

// //                 <div className="space-y-2">
// //                   <label className="text-sm font-medium">Time</label>
// //                   <Select
// //                     value={formData.time}
// //                     onValueChange={(time) => setFormData({ ...formData, time })}
// //                   >
// //                     <SelectTrigger>
// //                       <SelectValue placeholder="Select time" />
// //                     </SelectTrigger>
// //                     <SelectContent>
// //                       {TIME_SLOTS.map((time) => (
// //                         <SelectItem key={time} value={time}>
// //                           {time}
// //                         </SelectItem>
// //                       ))}
// //                     </SelectContent>
// //                   </Select>
// //                 </div>
// //               </div>

// //               {/* ACTION BUTTONS */}
// //               <div className="flex justify-end gap-3 pt-4">
// //                 <Button variant="outline" onClick={() => setOpen(false)}>
// //                   Cancel
// //                 </Button>
// //                 <Button onClick={scheduleMeeting} disabled={isCreating}>
// //                   {isCreating ? (
// //                     <>
// //                       <Loader2Icon className="mr-2 size-4 animate-spin" />
// //                       Scheduling...
// //                     </>
// //                   ) : (
// //                     "Schedule Interview"
// //                   )}
// //                 </Button>
// //               </div>
// //             </div>
// //           </DialogContent>
// //         </Dialog>
// //       </div>

// //       {/* LOADING STATE & MEETING CARDS */}
// //       {!interviews ? (
// //         <div className="flex justify-center py-12">
// //           <Loader2Icon className="size-8 animate-spin text-muted-foreground" />
// //         </div>
// //       ) : interviews.length > 0 ? (
// //         <div className="spacey-4">
// //           <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
// //             {interviews.map((interview) => (
// //               <MeetingCard key={interview._id} interview={interview} />
// //             ))}
// //           </div>
// //         </div>
// //       ) : (
// //         <div className="text-center py-12 text-muted-foreground">No interviews scheduled</div>
// //       )}
// //     </div>
// //   );
// // }
// // export default InterviewScheduleUI;





// import { useUser } from "@clerk/nextjs";
// import { useStreamVideoClient } from "@stream-io/video-react-sdk";
// import { useMutation, useQuery } from "convex/react";
// import { useState } from "react";
// import { api } from "../../../../convex/_generated/api";
// import toast from "react-hot-toast";
// import {
//   Dialog,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
//   DialogContent,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import UserInfo from "@/components/UserInfo";
// import { Loader2Icon, XIcon } from "lucide-react";
// import { Calendar } from "@/components/ui/calendar";
// import { TIME_SLOTS } from "@/constants";
// import MeetingCard from "@/components/MeetingCard";

// function InterviewScheduleUI() {
//   const client = useStreamVideoClient();
//   const { user } = useUser();
//   const [open, setOpen] = useState(false);
//   const [isCreating, setIsCreating] = useState(false);

//   const interviews = useQuery(api.interviews.getAllInterviews) ?? [];
//   const users = useQuery(api.users.getUsers) ?? [];

//   const createInterview = useMutation(api.interviews.createInterview);

//   const candidates = users?.filter((u) => u.role === "candidate");
//   const interviewers = users?.filter((u) => u.role === "interviewer");

//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     date: new Date(),
//     time: "09:00",
//     candidateId: "",
//     interviewerIds: user?.id ? [user.id] : [],
//   });

//   const scheduleMeeting = async () => {
//     if (!client || !user) return;
//     if (!formData.candidateId || formData.interviewerIds.length === 0) {
//       toast.error("Please select both candidate and at least one interviewer");
//       return;
//     }

//     setIsCreating(true);

//     try {
//       const { title, description, date, time, candidateId, interviewerIds } = formData;
//       const [hours, minutes] = time.split(":");
//       const meetingDate = new Date(date);
//       meetingDate.setHours(parseInt(hours), parseInt(minutes), 0);

//       const id = crypto.randomUUID();
//       const call = client.call("default", id);

//       await call.getOrCreate({
//         data: {
//           starts_at: meetingDate.toISOString(),
//           custom: {
//             description: title,
//             additionalDetails: description,
//           },
//         },
//       });

//       await createInterview({
//         title,
//         description,
//         startTime: String(meetingDate.getTime()),
//         status: "upcoming",
//         streamCallId: id,
//         candidateId,
//         interviewerIds,
//       });

//       setOpen(false);
//       toast.success("Meeting scheduled successfully!");

//       setFormData({
//         title: "",
//         description: "",
//         date: new Date(),
//         time: "09:00",
//         candidateId: "",
//         interviewerIds: user?.id ? [user.id] : [],
//       });
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to schedule meeting. Please try again.");
//     } finally {
//       setIsCreating(false);
//     }
//   };

//   const addInterviewer = (interviewerId: string) => {
//     if (!formData.interviewerIds.includes(interviewerId)) {
//       setFormData((prev) => ({
//         ...prev,
//         interviewerIds: [...prev.interviewerIds, interviewerId],
//       }));
//     }
//   };

//   const removeInterviewer = (interviewerId: string) => {
//     if (interviewerId === user?.id) return;
//     setFormData((prev) => ({
//       ...prev,
//       interviewerIds: prev.interviewerIds.filter((id) => id !== interviewerId),
//     }));
//   };

//   const selectedInterviewers = interviewers.filter((i) =>
//     formData.interviewerIds.includes(i.clerkId)
//   );

//   const availableInterviewers = interviewers.filter(
//     (i) => !formData.interviewerIds.includes(i.clerkId)
//   );

//   return (
//     <div className="container max-w-7xl mx-auto p-6 space-y-8">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold">Interviews</h1>
//           <p className="text-muted-foreground mt-1">Schedule and manage interviews</p>
//         </div>

//         <Dialog open={open} onOpenChange={setOpen}>
//           <DialogTrigger asChild>
//             <Button size="lg">Schedule Interview</Button>
//           </DialogTrigger>

//           <DialogContent className="sm:max-w-[500px] h-[calc(100vh-200px)] overflow-auto">
//             <DialogHeader>
//               <DialogTitle>Schedule Interview</DialogTitle>
//             </DialogHeader>
//             <div className="space-y-4 py-4">
//               {/* TITLE */}
//               <div className="space-y-2">
//                 <label className="text-sm font-medium">Title</label>
//                 <Input
//                   placeholder="Interview title"
//                   value={formData.title}
//                   onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//                 />
//               </div>

//               {/* DESCRIPTION */}
//               <div className="space-y-2">
//                 <label className="text-sm font-medium">Description</label>
//                 <Textarea
//                   placeholder="Interview description"
//                   value={formData.description}
//                   onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//                   rows={3}
//                 />
//               </div>

//               {/* CANDIDATE SELECT (FIXED) */}
//               <div className="space-y-2">
//                 <label className="text-sm font-medium">Candidate</label>
//                 <Select
//                   value={formData.candidateId}
//                   onValueChange={(value) => setFormData({ ...formData, candidateId: value })}
//                 >
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select candidate" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {candidates.map((candidate) => (
//                       <SelectItem key={candidate.clerkId} value={candidate.clerkId}>
//                         <UserInfo user={candidate} />
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>

//               {/* INTERVIEWER SELECT */}
//               <div className="space-y-2">
//                 <label className="text-sm font-medium">Interviewers</label>
//                 <div className="flex flex-wrap gap-2 mb-2">
//                   {selectedInterviewers.map((interviewer) => (
//                     <div
//                       key={interviewer.clerkId}
//                       className="inline-flex items-center gap-2 bg-secondary px-2 py-1 rounded-md text-sm"
//                     >
//                       <UserInfo user={interviewer} />
//                       {interviewer.clerkId !== user?.id && (
//                         <button
//                           onClick={() => removeInterviewer(interviewer.clerkId)}
//                           className="hover:text-destructive transition-colors"
//                         >
//                           <XIcon className="h-4 w-4" />
//                         </button>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//                 {availableInterviewers.length > 0 && (
//                   <Select onValueChange={addInterviewer}>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Add interviewer" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {availableInterviewers.map((interviewer) => (
//                         <SelectItem key={interviewer.clerkId} value={interviewer.clerkId}>
//                           <UserInfo user={interviewer} />
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 )}
//               </div>

//               {/* DATE & TIME */}
//               <div className="flex gap-4">
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium">Date</label>
//                   <Calendar
//                     mode="single"
//                     selected={formData.date}
//                     onSelect={(date) => date && setFormData({ ...formData, date })}
//                     disabled={(date) => date < new Date()}
//                     className="rounded-md border"
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <label className="text-sm font-medium">Time</label>
//                   <Select
//                     value={formData.time}
//                     onValueChange={(time) => setFormData({ ...formData, time })}
//                   >
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select time" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {TIME_SLOTS.map((time) => (
//                         <SelectItem key={time} value={time}>
//                           {time}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </div>

//               <div className="flex justify-end gap-3 pt-4">
//                 <Button variant="outline" onClick={() => setOpen(false)}>
//                   Cancel
//                 </Button>
//                 <Button onClick={scheduleMeeting} disabled={isCreating}>
//                   {isCreating ? (
//                     <>
//                       <Loader2Icon className="mr-2 size-4 animate-spin" />
//                       Scheduling...
//                     </>
//                   ) : (
//                     "Schedule Interview"
//                   )}
//                 </Button>
//               </div>
//             </div>
//           </DialogContent>
//         </Dialog>
//       </div>

//       {/* INTERVIEW CARDS */}
//       {!interviews ? (
//         <div className="flex justify-center py-12">
//           <Loader2Icon className="size-8 animate-spin text-muted-foreground" />
//         </div>
//       ) : interviews.length > 0 ? (
//         <div className="spacey-4">
//           <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//             {interviews.map((interview) => (
//               <MeetingCard key={interview._id} interview={interview} />
//             ))}
//           </div>
//         </div>
//       ) : (
//         <div className="text-center py-12 text-muted-foreground">No interviews scheduled</div>
//       )}
//     </div>
//   );
// }

// export default InterviewScheduleUI;



// //YE HAI RI TERA PICHLA CODE











// "use client";

// import { useState } from "react";
// import { useUser } from "@clerk/nextjs";
// import { useStreamVideoClient } from "@stream-io/video-react-sdk";
// import { useMutation, useQuery } from "convex/react";

// import toast from "react-hot-toast";
// import {
//   Dialog,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
//   DialogContent,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Calendar } from "@/components/ui/calendar";
// import { Loader2, X } from "lucide-react";
// import UserInfo from "@/components/UserInfo";
// import { TIME_SLOTS } from "@/constants";
// import MeetingCard from "@/components/MeetingCard";
// import { api } from "../../../../convex/_generated/api";

// export default function InterviewScheduleUI() {
//   const client = useStreamVideoClient();
//   const { user } = useUser();
//   const [open, setOpen] = useState(false);
//   const [isCreating, setIsCreating] = useState(false);

//   const interviews = useQuery(api.interviews.getAllInterviews) ?? [];
//   const users = useQuery(api.users.getUsers) ?? [];
//   const createInterview = useMutation(api.interviews.createInterview);

//   const candidates = users?.filter((u) => u.role === "candidate");
//   const interviewers = users?.filter((u) => u.role === "interviewer");

//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     date: new Date(),
//     time: "09:00",
//     candidateId: "",
//     interviewerIds: user?.id ? [user.id] : [],
//   });

//   const scheduleMeeting = async () => {
//     if (!client || !user) return;
//     if (!formData.candidateId || formData.interviewerIds.length === 0) {
//       toast.error("Please select both candidate and at least one interviewer");
//       return;
//     }

//     setIsCreating(true);

//     try {
//       const { title, description, date, time, candidateId, interviewerIds } = formData;
//       const [hours, minutes] = time.split(":");
//       const meetingDate = new Date(date);
//       meetingDate.setHours(parseInt(hours), parseInt(minutes), 0);

//       const id = crypto.randomUUID();
//       const call = client.call("default", id);

//       await call.getOrCreate({
//         data: {
//           starts_at: meetingDate.toISOString(),
//           custom: { description: title, additionalDetails: description },
//         },
//       });

//       await createInterview({
//         title,
//         description,
//         startTime: String(meetingDate.getTime()),
//         status: "upcoming",
//         streamCallId: id,
//         candidateId,
//         interviewerIds,
//       });

//       toast.success("Meeting scheduled!");
//       setOpen(false);
//       setFormData({
//         title: "",
//         description: "",
//         date: new Date(),
//         time: "09:00",
//         candidateId: "",
//         interviewerIds: user?.id ? [user.id] : [],
//       });
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to schedule meeting.");
//     } finally {
//       setIsCreating(false);
//     }
//   };

//   const addInterviewer = (id: string) => {
//     if (!formData.interviewerIds.includes(id)) {
//       setFormData({ ...formData, interviewerIds: [...formData.interviewerIds, id] });
//     }
//   };

//   const removeInterviewer = (id: string) => {
//     if (id === user?.id) return;
//     setFormData({
//       ...formData,
//       interviewerIds: formData.interviewerIds.filter((x) => x !== id),
//     });
//   };

//   const selectedInterviewers = interviewers.filter((i) =>
//     formData.interviewerIds.includes(i.clerkId)
//   );

//   const availableInterviewers = interviewers.filter(
//     (i) => !formData.interviewerIds.includes(i.clerkId)
//   );

//   return (
//     <div className="container mx-auto p-6 space-y-8">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold">Interviews</h1>
//           <p className="text-muted-foreground">Schedule and manage interviews</p>
//         </div>

//         <Dialog open={open} onOpenChange={setOpen}>
//           <DialogTrigger asChild>
//             <Button>Schedule Interview</Button>
//           </DialogTrigger>
//           <DialogContent className="sm:max-w-[500px] h-[calc(100vh-200px)] overflow-auto">
//             <DialogHeader>
//               <DialogTitle>Schedule Interview</DialogTitle>
//             </DialogHeader>

//             <div className="space-y-4 py-4">
//               <div>
//                 <label className="text-sm font-medium">Title</label>
//                 <Input
//                   value={formData.title}
//                   onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//                   placeholder="Interview title"
//                 />
//               </div>

//               <div>
//                 <label className="text-sm font-medium">Description</label>
//                 <Textarea
//                   value={formData.description}
//                   onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//                   placeholder="Interview description"
//                 />
//               </div>

//               <div>
//                 <label className="text-sm font-medium">Candidate</label>
//                 <Select
//                   value={formData.candidateId}
//                   onValueChange={(candidateId) => setFormData({ ...formData, candidateId })}
//                 >
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select candidate" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {candidates.map((c) => (
//                       <SelectItem key={c.clerkId} value={c.clerkId}>
//                         <UserInfo user={c} />
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div>
//                 <label className="text-sm font-medium">Interviewers</label>
//                 <div className="flex flex-wrap gap-2">
//                   {selectedInterviewers.map((i) => (
//                     <div
//                       key={i.clerkId}
//                       className="inline-flex items-center gap-2 bg-secondary px-2 py-1 rounded-md text-sm"
//                     >
//                       <UserInfo user={i} />
//                       {i.clerkId !== user?.id && (
//                         <button
//                           onClick={() => removeInterviewer(i.clerkId)}
//                           className="hover:text-destructive"
//                         >
//                           <X className="h-4 w-4" />
//                         </button>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//                 {availableInterviewers.length > 0 && (
//                   <Select onValueChange={addInterviewer}>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Add interviewer" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {availableInterviewers.map((i) => (
//                         <SelectItem key={i.clerkId} value={i.clerkId}>
//                           <UserInfo user={i} />
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 )}
//               </div>

//               <div className="flex gap-4">
//                 <div>
//                   <label className="text-sm font-medium">Date</label>
//                   <Calendar
//                     mode="single"
//                     selected={formData.date}
//                     onSelect={(date) => date && setFormData({ ...formData, date })}
//                     disabled={(date) => date < new Date()}
//                     className="rounded-md border"
//                   />
//                 </div>

//                 <div className="flex-1 space-y-2">
//                   <label className="text-sm font-medium">Time</label>
//                   <Select
//                     value={formData.time}
//                     onValueChange={(time) => setFormData({ ...formData, time })}
//                   >
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select time" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {TIME_SLOTS.map((time) => (
//                         <SelectItem key={time} value={time}>
//                           {time}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </div>

//               <div className="flex justify-end">
//                 <Button onClick={scheduleMeeting} disabled={isCreating}>
//                   {isCreating ? (
//                     <>
//                       <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                       Scheduling...
//                     </>
//                   ) : (
//                     "Schedule Interview"
//                   )}
//                 </Button>
//               </div>
//             </div>
//           </DialogContent>
//         </Dialog>
//       </div>

//       {/* Scheduled Interviews */}
//       {interviews.length === 0 ? (
//         <p className="text-muted-foreground text-center py-12">No interviews scheduled.</p>
//       ) : (
//         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//           {interviews.map((i) => (
//             <MeetingCard key={i._id} interview={i} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
