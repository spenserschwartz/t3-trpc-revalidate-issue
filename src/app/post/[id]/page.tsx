import IndividualPostPage from "./IndividualPostPage";
import { revalidatePath } from "next/cache";

function DetailPage({ params }: { params: { id: string } }) {
  const revalidate = async () => {
    "use server";
    revalidatePath("/all-posts");
  };

  return <IndividualPostPage revalidate={revalidate} params={params} />;
}

export default DetailPage;
