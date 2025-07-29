import Form from "next/form";
import SearchFormReset from "@/components/SearchFormReset";


const SearchForm = () => {
    const query = "test"

    return (
        <Form action={"/"} scroll={false} className={"search-form"}>
            <input
                name={"query"}
                defaultValue={""}
                className={"search-input"}
                placeholder={"Search Startups"}
            />
            <div className={"flex gap-2"}>
                {query && (
                    <SearchFormReset/>
                )}
            </div>

        </Form>
    );
};

export default SearchForm;