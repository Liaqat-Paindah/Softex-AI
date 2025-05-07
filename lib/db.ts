import { MongoClient, ServerApiVersion } from "mongodb"


if(!process.env.MONGODB_URI)
{
    throw new Error("Connecting error to Database")
}
const client = new MongoClient(process.env.MONGODB_URI,{
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
});


export async function ConnectDB(DBName:string){
        try
        {
            await client.connect()
            const db = client.db(DBName)
            return db
        }
        catch
        {
            console.log("Don't connected to DB!")
        }
}

export async function GetCollection(collectionName:string)
{

    const Collection = await ConnectDB('Softex_AI')
    if (Collection)
    {
        const db = Collection.collection(collectionName)
        return db
    }
    
}
