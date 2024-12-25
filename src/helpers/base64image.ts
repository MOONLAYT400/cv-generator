export const extractBase64Data = (base64String: string): string => {
  if (!base64String) return ""
  const base64Data = base64String.split(",")[1]
  return base64Data
}
