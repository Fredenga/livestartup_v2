import SearchForm from "@/components/SearchForm";
import StartupCard from "@/components/StartupCard"
export default async function Home({searchParams}: {searchParams: Promise<{query?: string}>}) {
  const query = (await searchParams).query;
  const posts = [{
      _createdAt: new Date(),
      views: 55,
      author: {
          _id: 1,
          name: "Albert Stark"
      },
      _id: 1,
      description: "This is a description",
      image: "https://images.unsplash.com/photo-1593376853899-fbb47a057fa0?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cm9ib3RzfGVufDB8fDB8fHww",
      category: "Robots",
      title: "We Robots"
  }]
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
                <p className={"text-30-semibold"}>
                    {query ? `Search results for the following query: ${query}` : `All Startups`}
                    <ul className={"mt-7 card_grid"}>
                        {
                            posts?.length > 0 ? posts.map((post: StartupCardType, index: number) => (

                                <StartupCard key={post?._id} post={post} />
                            )) : (
                                <p className={"no-result"}>No startups found</p>
                            )

                        }
                    </ul>
                </p>
            </section>
        </>
  );
}