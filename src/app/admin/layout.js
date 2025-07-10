"use client"
import AdminLayout from "@/src/app/admin/components/AdminLayout";


export default function AdminSectionLayout({ children }) {
    return (

        <html lang="en">
            <body>
                <AdminLayout>
                    {children}
                </AdminLayout>
            </body>
        </html>
    )
}


