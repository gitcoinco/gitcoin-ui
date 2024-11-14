import { ProjectReview } from "./types";

export const mockPendingReview0: ProjectReview[] = [
  {
    id: 1,
    name: "project title",
    date: new Date(2024, 5, 3, 15, 0, 0),
    avatarUrl: "https://ipfs.io/ipfs/QmVSEo7Q1NFok7AT3vqD55EoThBgujoF1KXhiph9T9MNTr",
    reviews: [],
    aiSuggestion: 60,
    scoreAverage: 60,
  },
  {
    id: 2,
    name: "project title",
    date: new Date(2024, 5, 3, 15, 0, 0),
    avatarUrl: "https://ipfs.io/ipfs/QmVSEo7Q1NFok7AT3vqD55EoThBgujoF1KXhiph9T9MNTr",
    reviews: [],
    aiSuggestion: 23,
    scoreAverage: 23,
  },
  {
    id: 3,
    name: "project title",
    date: new Date(2024, 5, 3, 15, 0, 0),
    avatarUrl: "https://ipfs.io/ipfs/QmVSEo7Q1NFok7AT3vqD55EoThBgujoF1KXhiph9T9MNTr",
    reviews: [],
    aiSuggestion: 54,
    scoreAverage: 54,
  },
];

export const mockReadyToSubmit0: ProjectReview[] = [
  {
    id: 1,
    name: "cool project",
    date: new Date(2024, 5, 3, 15, 0, 0),
    avatarUrl: "https://ipfs.io/ipfs/QmVSEo7Q1NFok7AT3vqD55EoThBgujoF1KXhiph9T9MNTr",
    reviews: [
      { approved: true, reviewer: "0xJohnDoe" },
      { approved: false, reviewer: "0xJaneDoe" },
      { approved: true, reviewer: "0xJoneDoe" },
    ],
    aiSuggestion: 72,
    scoreAverage: 88,
  },
  {
    id: 2,
    name: "project title",
    date: new Date(2024, 5, 3, 15, 0, 0),
    avatarUrl: "https://ipfs.io/ipfs/QmVSEo7Q1NFok7AT3vqD55EoThBgujoF1KXhiph9T9MNTr",
    reviews: [
      { approved: true, reviewer: "0xJohnDoe" },
      { approved: true, reviewer: "0xJoneDoe" },
    ],
    aiSuggestion: 80,
    scoreAverage: 92,
  },
  {
    id: 3,
    name: "project title",
    date: new Date(2024, 5, 3, 15, 0, 0),
    avatarUrl: "https://ipfs.io/ipfs/QmVSEo7Q1NFok7AT3vqD55EoThBgujoF1KXhiph9T9MNTr",
    reviews: [
      { approved: true, reviewer: "0xJohnDoe" },
      { approved: true, reviewer: "0xJoneDoe" },
    ],
    aiSuggestion: 80,
    scoreAverage: 92,
  },
];
