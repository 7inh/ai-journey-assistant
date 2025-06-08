"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { HardDrive, Upload, Download, Trash2, FileText, FileArchive, FileImage } from "lucide-react"

interface StorageFile {
  id: string
  name: string
  size: string
  lastModified: string
  type?: string // e.g., 'pdf', 'zip', 'image'
}

interface StorageData {
  totalStorage: string
  usedStorage: string
  files: StorageFile[]
}

interface StorageManagementSectionProps {
  storage: StorageData
}

const getFileIcon = (fileName: string) => {
  const extension = fileName.split(".").pop()?.toLowerCase()
  if (extension === "pdf") return <FileText className="h-5 w-5 text-red-500" />
  if (["zip", "tar", "gz"].includes(extension || "")) return <FileArchive className="h-5 w-5 text-yellow-500" />
  if (["png", "jpg", "jpeg", "gif", "svg"].includes(extension || ""))
    return <FileImage className="h-5 w-5 text-blue-500" />
  return <FileText className="h-5 w-5 text-gray-500" />
}

export function StorageManagementSection({ storage }: StorageManagementSectionProps) {
  const usedStorageBytes = Number.parseFloat(storage.usedStorage.split(" ")[0])
  const totalStorageBytes = Number.parseFloat(storage.totalStorage.split(" ")[0])
  const storagePercentage = (usedStorageBytes / totalStorageBytes) * 100

  // Mock handlers
  const handleUpload = () => alert("Upload functionality to be implemented.")
  const handleDownload = (fileName: string) => alert(`Download ${fileName} to be implemented.`)
  const handleDelete = (fileName: string) => {
    // In a real app, you'd want a confirmation dialog here
    if (confirm(`Are you sure you want to delete ${fileName}? This action cannot be undone.`)) {
      alert(`Delete ${fileName} to be implemented.`)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HardDrive className="h-6 w-6" />
          Storage Management
        </CardTitle>
        <CardDescription>View and manage your stored files and resources.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm text-muted-foreground">Storage Usage</span>
            <span className="text-sm font-medium">
              {storage.usedStorage} / {storage.totalStorage}
            </span>
          </div>
          <Progress value={storagePercentage} aria-label={`${storagePercentage}% storage used`} />
        </div>

        <div className="flex flex-wrap gap-2">
          <Button onClick={handleUpload}>
            <Upload className="mr-2 h-4 w-4" /> Upload Files
          </Button>
          {/* Add more actions if needed, e.g., Create Folder */}
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Stored Files</h3>
          {storage.files.length > 0 ? (
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]"></TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Last Modified</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {storage.files.map((file) => (
                    <TableRow key={file.id}>
                      <TableCell>{getFileIcon(file.name)}</TableCell>
                      <TableCell className="font-medium">{file.name}</TableCell>
                      <TableCell>{file.size}</TableCell>
                      <TableCell>{file.lastModified}</TableCell>
                      <TableCell className="text-right space-x-1">
                        <Button variant="ghost" size="icon" onClick={() => handleDownload(file.name)} title="Download">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(file.name)}
                          title="Delete"
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">No files stored yet.</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
