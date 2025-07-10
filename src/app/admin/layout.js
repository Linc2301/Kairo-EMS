import AdminLayout from "@/src/app/admin/components/AdminLayout";

export const metadata = {
    title: "Admin Panel",
};

export default function AdminSectionLayout({ children }) {
    return <AdminLayout>{children}</AdminLayout>;
}
