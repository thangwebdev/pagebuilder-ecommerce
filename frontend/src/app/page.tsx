import { redirect } from "next/navigation";

const getFirstUrl = async () => {
  return "/home";
};

export default async function index() {
  const firstUrl = await getFirstUrl();
  return redirect(firstUrl);
}
