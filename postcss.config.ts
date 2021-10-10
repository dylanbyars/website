const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === "production"
      ? {
        "@fullhuman/postcss-purgecss": {
          content: [
            "./components/**/*.ts",
            "./pages/**/*.ts",
          ],
          defaultExtractor: (content: string) =>
            content.match(/[\w-/:]+(?<!:)/g) || [],
        },
      }
      : {}),
  },
};

export default config;
