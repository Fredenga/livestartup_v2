"use client"
import {useActionState, useState} from "react";
import {Textarea} from "@/components/ui/textarea";
import MDEditor from "@uiw/react-md-editor"
import {Button} from "@/components/ui/button";
import {Send} from "lucide-react";
import {FormSchema} from "@/lib/validation";
import {z} from "zod";
import {useToast} from "@/hooks/use-toast"
import {useRouter} from "next/navigation";
import {createPitch} from "@/lib/actions";

const StartupForm = () => {
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [pitch, setPitch] = useState("")

    const {toast} = useToast();
    const router = useRouter()


    const handleFormSubmit = async (prevState: any, formData: FormData) => {
        try {
            const formValues = {
                title: formData.get("title") as string,
                description: formData.get("description") as string,
                category: formData.get("category") as string,
                link: formData.get("link") as string,
                pitch
            }
            await FormSchema.parseAsync(formValues)

            const result = await createPitch(prevState, formData, pitch)

            if(result.status === "SUCCESS"){
                toast({
                    title: "Success",
                    description: "Your startup pitch has been created successfully",
                })
            }

            await router.push(`/startup/${result._id}`)

            return result

        } catch (error) {
            if(error instanceof z.ZodError) {
                const fieldErrors = error.flatten().fieldErrors

                setErrors(fieldErrors as unknown as Record<string, string>)

                toast({
                    title: "Error",
                    description: "Please check your inputs and try again",
                    variant: "destructive"
                })

                return {...prevState, error: "Validation failed", status: "ERROR"}
            }
            toast({
                title: "Error",
                description: "An unexpected error has occured",
                variant: "destructive"
            })
            return {
                ...prevState,
                error: "An unexpected error has occurred",
                status: "ERROR"
            }
        }
    }

    const [state, formAction, isPending] = useActionState(
        handleFormSubmit,
        {error: "", status: "INITIAL"}
    )


    return (
        <form action={formAction} className={"startup-form"}>
            <div>
                <label htmlFor={"title"} className={"startup-form_label"}>Title</label>
                <input id={"title"} name={"title"} className={"startup-form_input"} placeholder={"Startup Title"} />
                {errors.title && <p className={"startup-form_error"}>{errors.title}</p>}
            </div>
            <div>
                <label htmlFor={"description"} className={"startup-form_label"}>Description</label>
                <Textarea id={"description"} name={"description"} className={"startup-form_textarea"} placeholder={"Startup Description"} />
                {errors.description && <p className={"startup-form_error"}>{errors.description}</p>}
            </div>
            <div>
                <label htmlFor={"category"} className={"startup-form_label"}>Category (Tech, Health, Education, etc</label>
                <input id={"category"} name={"category"} className={"startup-form_input"} placeholder={"Startup Category (Tech, Health, Education, etc)"} />
                {errors.category && <p className={"startup-form_error"}>{errors.category}</p>}
            </div>
            <div>
                <label htmlFor={"link"} className={"startup-form_label"}>Image URL</label>
                <input id={"link"} name={"link"} className={"startup-form_input"} placeholder={"Startup Image URL"} />
                {errors.link && <p className={"startup-form_error"}>{errors.link}</p>}
            </div>
            <div data-color-mode={"light"}>
                <label htmlFor={"pitch"} className={"startup-form_label"}>Pitch</label>
                <MDEditor
                    value={pitch}
                    onChange={(value) => setPitch(value as string)}
                    id={"pitch"}
                    preview={"edit"}
                    height={300}
                    style={{borderRadius: 20, overflow: "hidden"}}
                    textareaProps={{
                        placeholder: "Briefly describe your idea and what problem it solves"
                    }}
                    previewOptions={{
                        disallowedElements: ['style']
                    }}

                />
                {errors.pitch && <p className={"startup-form_error"}>{errors.pitch}</p>}
            </div>
            <Button type={"submit"} disabled={isPending} className={"startup-form_btn"}>
                {isPending ? "Submitting..." : "Submit Your Pitch"}
                <Send className={"size-6 ml-2"} />
            </Button>
        </form>
    );
};

export default StartupForm;