import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Запрещаем any
      "@typescript-eslint/no-explicit-any": "warn",
      // Требуем явные типы возврата у функций
      "@typescript-eslint/explicit-function-return-type": "off",
      // Предупреждение о неиспользуемых переменных
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      // React hooks
      "react-hooks/exhaustive-deps": "warn",
      // Порядок импортов
      "import/order": "off",
    },
  },
];

export default eslintConfig;
