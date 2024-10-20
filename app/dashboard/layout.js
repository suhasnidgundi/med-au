import BottomNavbar from "@/components/BottomNavbar/BottomNavbar";

export default function DashboardLayout({ children }) {
    return (
        <>
            <main className="container py-4">
                {children}
            </main>
            <BottomNavbar />
        </>
    );
}