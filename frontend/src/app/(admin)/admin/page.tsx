import { redirect } from "next/navigation";

export default function IndexAdmin() {
  return redirect("/admin/home");
}
