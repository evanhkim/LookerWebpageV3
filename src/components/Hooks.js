import React, { useContext, useState } from 'react'
import { ExtensionContext } from '@looker/extension-sdk-react'
import { ComponentsProvider } from "@looker/components"

const Message = () => {
    const [message, setMessage] = useState('')
    const { core40SDK } = useContext(ExtensionContext)

    useEffect(() => {
        const initialize = async () => {
            try {
                const value = await core40SDK.ok(core40SDK.me())
                setMessage(
                    `${value.display_name.split(' ')[0]}, Welcome to Bond Intelligence `
                )
            } catch (error) {
                setMessage('Error occured getting information about me!')
                console.error(error)
            }
        }
        initialize()
    }, [])

    return (

        <ComponentsProvider>
            <Space p="xxxxxsmall" width="100%" height="15vh" around>
                <Text p="xxxxxlarge" fontSize="xxxxxlarge" color="white">
                    {message}
                </Text>
            </Space>
        </ComponentsProvider>
    )
}

export default Message;