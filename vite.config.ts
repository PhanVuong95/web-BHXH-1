import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import obfuscatorPlugin from "vite-plugin-javascript-obfuscator";
import { fileURLToPath } from "url";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    define: {
      __CONFIG_APP__: JSON.stringify(env),
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    plugins: [
      react(),
      obfuscatorPlugin({
        options: {
          include: ["src/path/to/file.js", "path/anyjs/**/*.js", /foo.js$/],
          exclude: [/node_modules/],
          apply: "build",
          debugger: false,
          sourcemap: false,
          compact: true, // Thu gọn mã nguồn
          controlFlowFlattening: true, // Làm rối luồng điều khiển
          deadCodeInjection: true, // Thêm mã chết
          debugProtection: false, // Bảo vệ debug
          stringArray: true, // Chuyển đổi chuỗi thành mảng
        },
      }),
    ],
  };
});
