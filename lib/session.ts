import 'server-only'
import { jwtVerify, SignJWT } from "jose"
import { cookies } from 'next/headers'
const Secret_key = process.env.SESSION_SECRET
const EncodedSecretKey = new TextEncoder().encode(Secret_key)


const secret = new TextEncoder().encode('your-secret-key');
//// 
export async function encrypt(payload: Record<string, unknown>) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret);
}

export async function decrypt(session: string | undefined = '') {
    try
    {
        const {payload} = await jwtVerify(session, EncodedSecretKey, {
            algorithms: ['HS256']})
            return payload 

    }
    catch (error) {
        console.log('Error decrypting session:', error)
    }

}

export async function CreateSession(UserID: string) {
    const ExpireAt = new Date(Date.now()+7*86400)
    const session = await encrypt({UserID, ExpireAt})
    const cookieStore = await cookies()

    cookieStore.set('Session', session, {
        httpOnly: true,
        secure: true,
        expires: ExpireAt,
        sameSite: 'lax',
        path: '/'
    })
}