export const formatMessage = (message: string) => {
  const boldRegex = /\*\*(.*?)\*\*/g; // **bold**
  const italicRegex = /\*(.*?)\*/g; // *italic*
  const newlineRegex = /\n/g; // Yeni satır

  return message
    .replace(boldRegex, (_, text) => `<strong>${text}</strong>`)
    .replace(italicRegex, (_, text) => `<em>${text}</em>`)
    .replace(newlineRegex, "<br />");
};
