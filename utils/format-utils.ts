export function formatFileNameAsTitle(fileName: string): string {
  // Remove extension
  const nameWithoutExt = fileName.replace(/\.[^/.]+$/, "");
  // Replace underscores and dashes with spaces, then capitalize each word
  return nameWithoutExt
    .replace(/[_\-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\w\S*/g, (txt) =>
      txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase()
    );
}