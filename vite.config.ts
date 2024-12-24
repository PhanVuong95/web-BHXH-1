import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import obfuscatorPlugin from "vite-plugin-javascript-obfuscator";

export default defineConfig({
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
        debugProtection: true, // Bảo vệ debug
        stringArray: true, // Chuyển đổi chuỗi thành mảng
      },
    }),
  ],

  // base: "/web-BHXH-1",
});
