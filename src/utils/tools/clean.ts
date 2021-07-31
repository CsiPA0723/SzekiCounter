export function clean(text: string): string {
  return text?.replace?.(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
}
