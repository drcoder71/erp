import { connect } from "mongoose"

export const MongooseConfig = async () => {
    try {
        await connect(process.env.MONGOOSE_SECRET_URL as string)
        return true
    } catch {
        return false
    }
}