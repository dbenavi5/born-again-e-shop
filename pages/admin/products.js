import React from "react";
import AdminLayout from "../../components/AdminLayout";

export default function AdminProductsScreen() {
  return <div>AdminProductsScreen</div>;
}

AdminProductsScreen.auth = { adminOnly: true };

AdminProductsScreen.getLayout = function (page, title) {
  return <AdminLayout title={title}>{page}</AdminLayout>;
};
