export const themeTokens = {
  colors: {
    obsidian: "#05070b",
    graphite: "#10151d",
    chrome: "#bfc9d8",
    chromeMuted: "#7d8899",
    mist: "#dfe8f4",
    glow: "#8db1ff",
    emerald: "#6ef1c2",
    amber: "#f7c66e",
    crimson: "#ff7272"
  },
  radius: {
    panel: "30px",
    pill: "999px"
  },
  blur: {
    heavy: "22px"
  },
  motion: {
    precise: "cubic-bezier(0.22, 1, 0.36, 1)"
  }
} as const;

export const shellBackground =
  "radial-gradient(circle at top, rgba(143, 177, 255, 0.16), transparent 24%), linear-gradient(135deg, #040507, #0a0d12 40%, #05070b 100%)";

