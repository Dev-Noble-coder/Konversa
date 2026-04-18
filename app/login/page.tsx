import AuthForm from "../components/AuthForm";

export const metadata = {
    title: "Login | Konversa",
    description: "Login to your Konversa account to manage your social sales.",
};

export default function LoginPage() {
    return <AuthForm initialIsLogin={true} allowToggle={false} />;
}
