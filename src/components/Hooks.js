import React, { useEffect, useContext, useState } from 'react'
import { Space, ComponentsProvider, Text } from '@looker/components'
import { ExtensionContext } from '@looker/extension-sdk-react'

export const Message = () => {

    const { core40SDK } = useContext(ExtensionContext)
    const [message, setMessage] = useState()

    useEffect(() => {
        const getMe = async () => {
            try {
                const me = await core40SDK.ok(core40SDK.me())
                setMessage(`${me.display_name.split(' ')[0]}, Welcome to Bond Intelligence`)
            } catch (error) {
                console.error(error)
                setMessage('An error occurred while getting information about me!')
            }
        }
        getMe()
    }, [core40SDK])

    return (
        <>
            <ComponentsProvider>
                <div align="center" width="100%" height="12vh" style={{ backgroundColor: "#131722" }}>
                    <Text style={{ lineHeight: "12vh" }} fontSize="50px" color="#9B9EA3">
                        {message}
                    </Text>
                </div>
            </ComponentsProvider>
        </>
    )
}

export default Message;