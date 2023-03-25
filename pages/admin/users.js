import React from "react";
import AdminLayout from "../../components/AdminLayout";

export default function AdminUsersScreen() {
  return <div>AdminUsersScreen</div>;
}

AdminUsersScreen.auth = { adminOnly: true };

AdminUsersScreen.getLayout = function (page, title) {
  return <AdminLayout title={title}>{page}</AdminLayout>;
};
