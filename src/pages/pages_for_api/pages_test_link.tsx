import Link from "next/link";
import { useRouter } from "next/router";

export default function pages_for_test_link(){
    
    const router= useRouter();
    const parameter=router.query;
    console.log(parameter.name)
    console.log(parameter.curse)

    return(
        <div>
            
            <div>
                test concluido
            </div>
            <Link href={'../'}>
                index 
            </Link>
        </div>
    )
}