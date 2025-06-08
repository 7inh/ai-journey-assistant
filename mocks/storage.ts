export interface StorageData {
  totalStorage: string;
  usedStorage: string;
  files: {
    id: string;
    name: string;
    size: string;
    lastModified: string;
  }[];
}

export const storageData: StorageData = {
  totalStorage: "20 GB",
  usedStorage: "7.5 GB",
  files: [
    {
      id: "1",
      name: "project-alpha-report.pdf",
      size: "2.5 MB",
      lastModified: "2024-05-15",
    },
    {
      id: "2",
      name: "user-data-backup.zip",
      size: "500 MB",
      lastModified: "2024-05-10",
    },
    {
      id: "3",
      name: "meeting-notes-q1.docx",
      size: "800 KB",
      lastModified: "2024-04-20",
    },
  ],
};
