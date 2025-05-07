import Link from 'next/link'
function users({params}:{params:{id:string}}) {
    const {id}= params
    return (

        <div className="container flex bg-gradient-to-r from-blue-400 to-purple-600 min-h-screen items-center justify-center">
            <div className="main">
                <div className="center bg-white text-center  mt-4 p-4 rounded-md items-center justify-center text-purple-600 w-md ">
                    <h2 className='mb-2 font-bold'>Welcome to users Page! {id}</h2>
                    <Link href="" className="bg-purple-600 rounded font- text-white p-2 text-sm ">Get Started</Link>
                    
                </div>
                
            </div>
            
        </div>
    )
}
export default users;