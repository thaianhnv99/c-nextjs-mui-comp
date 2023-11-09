import { apiClient } from "./apiClient";
import { getAuthorization, setUserProfile } from "./authorization"

const refreshToken = async () => {
    const accessTokenOld = getAuthorization();

    try {
        const credentials = await apiClient.post<any>('123', { refreshToken: accessTokenOld });

        if (credentials) {
            setUserProfile(credentials.data.user)
        }

        return credentials.data.token
    } catch (error) {

    }
}

export default refreshToken