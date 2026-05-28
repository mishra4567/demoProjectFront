// components/ui/index.js
// Barrel export — import anything from one place:
// import { Button, Input, useTheme, ThemeToggle } from "../components/ui";

export { default as Button } from "./htmlComponents/Button";
export { default as Input } from "./htmlComponents/Input";
export { default as Select } from "./htmlComponents/Select";
export { default as Textarea } from "./htmlComponents/Textarea";
export { default as Checkbox } from "./htmlComponents/Checkbox";
export { default as RadioGroup } from "./htmlComponents/RadioGroup";
export { default as Badge } from "./htmlComponents/Badge";
export { default as Card } from "./htmlComponents/Card";
export { default as Modal } from "./htmlComponents/Modal";
export { default as Alert } from "./htmlComponents/Alert";
export { default as Spinner } from "./htmlComponents/Spinner";
export { default as ThemeToggle } from "./ThemeProvider/ThemeToggle";
export {
  ThemeProvider,
  useTheme,
} from "./ThemeProvider/ThemeProvider";
export { default as IconBtn } from "./htmlComponents/IconBtn";

// import Button from "./htmlComponents/Button";
// import Input from "./htmlComponents/Input";
// import Select from "./htmlComponents/Select";
// import Textarea from "./htmlComponents/Textarea";
// import Checkbox from "./htmlComponents/Checkbox";
// import RadioGroup from "./htmlComponents/RadioGroup";
// import Badge from "./htmlComponents/Badge";
// import Card from "./htmlComponents/Card";
// import Modal from "./htmlComponents/Modal";
// import Alert from "./htmlComponents/Alert";
// import Spinner from "./htmlComponents/Spinner";
// import ThemeToggle from "./ThemeProvider/ThemeToggle";
// import { ThemeProvider, useTheme } from "./ThemeProvider/ThemeProvider";

// export { Button };
