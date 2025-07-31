import StartupForm from "@/components/startupForm";
import {auth} from "@/auth";
import {redirect} from "next/navigation";

const Page = async () => {

    const session = await auth()
    if(!session) redirect('/')
    return (
        <>
            <section className={"pink_container !min-h-[230px"}>
                <h2 className={"heading"}>Submit Your Startup</h2>

            </section>
            <StartupForm />
        </>
    );
};

export default Page;