import { CreatePostValidation } from "@/lib/rules";



export async function CreatePost(state, formData: FormData)
{
   const PostRulest = CreatePostValidation.safeParse({
    Title: formData.get('Title'),
    Date: formData.get('Date'),
    Photo: formData.get('Photo'),
    Description: formData.get('Description'),
   })
   if(!PostRulest.success)
   {
    return {
      errors: PostRulest.error.flatten().fieldErrors,
      Title: formData.get('Title'),
      Date: formData.get('Date'),
      Photo: formData.get('Photo'),
      Description: formData.get('Description'),
      
    };
   }

}