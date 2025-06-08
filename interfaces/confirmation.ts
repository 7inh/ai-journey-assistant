export interface ConfirmationOptions {
  title?: string
  message?: string
  confirmText?: string
  cancelText?: string
  variant?: "default" | "destructive"
}

export interface ConfirmationContextType {
  isOpen: boolean
  options: ConfirmationOptions
  showConfirmation: (options?: ConfirmationOptions) => Promise<boolean>
  handleConfirm: () => void
  handleCancel: () => void
}
