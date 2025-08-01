import SearchForm from "@/components/SearchForm";
import StartupCard, {StartupCardType} from "@/components/StartupCard"
import {STARTUPS_QUERY} from "@/sanity/lib/queries";
import {sanityFetch, SanityLive} from "@/sanity/lib/live";
import {auth} from "@/auth";
export default async function Home({searchParams}: {searchParams: Promise<{query?: string}>}) {
  const query = (await searchParams).query;

  const params = {search: query || null}

    const session = await auth()

    console.log(session?.id)

  const {data: posts} = await sanityFetch({query: STARTUPS_QUERY, params})
    return (
        <>
           <section className={"pink_container"}>
            <h1 className={"heading"}>Pitch Your Startup <br/> Connect with Entrepreneurs</h1>
            <p className={"sub-heading max-w-3xl"}>
                Submit ideas, Vote on Pitches and get noticed in Virtual Competitions
            </p>
               <SearchForm query={query}/>
           </section>
            <section className={"section_container"}>
                {/*<p className={"text-30-semibold"}>*/}
                    {query ? `Search results for the following query: ${query}` : `All Startups`}
                    <ul className={"mt-7 card_grid"}>
                        {
                            posts?.length > 0 ? posts.map((post: StartupCardType) => (

                                <StartupCard key={post?._id} post={post} />
                            )) : (
                                <p className={"no-result"}>No startups found</p>
                            )

                        }
                    </ul>
                {/*</p>*/}
            </section>
            <SanityLive/>
        </>
  );
}