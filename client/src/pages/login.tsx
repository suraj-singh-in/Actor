import styles from "@/styles/pages/login.module.css";
import { Button, Form, Input } from "antd";

import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function Login() {
  return (
    <div className={`${styles.loginContainer} ${poppins.variable}}`}>
      <div className={styles.loginHeader}>Sign In.</div>
      <div className={styles.loginFormContainer}>
        <Form layout="vertical">
          <Form.Item name="email" label="Email">
            <Input placeholder="E-mail" />
          </Form.Item>
          <Form.Item name="password" label="Password">
            <Input placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary">Sign In.</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
