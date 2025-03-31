import { createClient } from "@supabase/supabase-js"

const anon_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpic3ZzdXRmaW13eHRuZHhhbWdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE2MjE3NTMsImV4cCI6MjA1NzE5Nzc1M30.d00YwgDj76m-iZPTg8cOBaa2MXRcbRDCE8rwQSmcaFs"
const supabase_url = "https://zbsvsutfimwxtndxamge.supabase.co"

const supabase = createClient(supabase_url, anon_key)

export default function mediaUpload (file) {

    return new Promise((resolve, reject)=>{
        const timestamp = new Date().getTime();
        const fileName = timestamp+file.name;

        supabase.storage.from("images").upload(fileName,file, {
            cacheControl: '3600',
            upsert: false,
        }).then(()=>{

            const publicUrl = supabase.storage.from("images").getPublicUrl(fileName).data.publicUrl;
            console.log(publicUrl);
        })
    });
}  