import { type Component } from './components.types'

export const Components: Component[] = [
  // Assessment
  {
    id: "my-ext",
    page: "F02C006",
    name: "ClinicalNotes",
    targetId: "input-014aa",
    useTargetInput: true,
    requestMessage: "Please rewrite the following client's case history notes: ",
    tooltip: "Rewrite notes",
  },
  {
    id: "my-ext",
    page: "F02C006",
    name: "COSIGoals",
    targetId: "input-014",
    requestMessage: "Please write a few COSI goals for this client given the following case history notes: ",
    tooltip: "COSI goals",
    inputFields: [
      {
        id: "input-014aa",
        name: "Case History Notes",
      },
    ],
  },
  {
    id: "my-ext",
    page: "F02C006",
    name: "GPReport",
    targetId: "input-055-comments",
    tooltip: "Create GP Report",
    requestMessage: "Please write a brief GP report with relevant case history, the following results and recommendations for hearing aids or referral if reuqired. Please format case history with bullet poitns and don't include salutation or closing: ",
    inputFields: [
      {
        id: "input-014aa",
        name: "Case History Notes",
      },
      {
        id: "input-0037",
        name: "Results",
      },
    ],
  },
  // Clinical Notes
  {
    id: "my-ext",
    page: "F02C025",
    name: "ClinicalNotes",
    targetId: "input-011",
    useTargetInput: true,
    requestMessage: "Please rewrite the following client's appointment notes: ",
    tooltip: "Rewrite notes",
  },
  // Review (Aided)
  {
    id: "my-ext",
    page: "F02C001A",
    name: "ReviewNotes",
    targetId: "input-1001",
    useTargetInput: true,
    requestMessage: "Please rewrite the following client's review appointment notes: ",
    tooltip: "Rewrite notes",
  },
  {
    id: "my-ext",
    page: "F02C001A",
    name: "COSIGoals",
    targetId: "input-018c",
    requestMessage: "Please write a few COSI goals for this client given the following client review notes: ",
    tooltip: "COSI goals",
    inputFields: [
      {
        id: "input-1001",
        name: "Client Review Notes",
      },
    ],
  },
  // Review (Unaided)
  {
    id: "my-ext",
    page: "F02C001B",
    name: "ReviewNotes",
    targetId: "input-0211",
    useTargetInput: true,
    requestMessage: "Please rewrite the following client's review appointment notes: ",
    tooltip: "Rewrite notes",
  },
  {
    id: "my-ext",
    page: "F02C001B",
    name: "COSIGoals",
    targetId: "input-023",
    requestMessage: "Please write a few COSI goals for this client given the following client review notes: ",
    tooltip: "COSI goals",
    inputFields: [
      {
        id: "input-0211",
        name: "Client Review Notes",
      },
    ],
  },
  // Rehabilitation & Device Selection
  {
    id: "my-ext",
    page: 'FREHAB',
    name: "ReviewNotes",
    targetId: "input-audiological-review-001",
    useTargetInput: true,
    requestMessage: "Please rewrite the following client's review appointment notes: ",
    tooltip: "Rewrite notes",
  },
  {
    id: "my-ext",
    page: 'FREHAB',
    name: "COSIGoals",
    targetId: "rehabiltation-plan-001",
    requestMessage: "Please write a few COSI goals for this client given the following client review notes: ",
    tooltip: "COSI goals",
    inputFields: [
      {
        id: "input-audiological-review-001",
        name: "Client Review Notes",
      },
    ],
  },
]
