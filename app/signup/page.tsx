import AuthForm from "../components/AuthForm";

export const metadata = {
    title: "Sign Up | Konversa",
    description: "Join Konversa and start automating your social media sales today.",
};

export default function SignupPage() {
    return <AuthForm initialIsLogin={false} allowToggle={false} />;
}
