import logger from "./../logging"

type MessageResponse = (response?: any) => void

const messagesFromReactAppListener = (
    message: Object,
    sender: chrome.runtime.MessageSender,
    response: MessageResponse
) => {
    logger.devVerbose('[content.ts] messagesFromReactAppListener' + message)
    // const isValidated = validateSender(message, sender);

    // if (isValidated && message.message === 'Hello from React') {
    //     response('Hello from content.js');
    // }

    // if (isValidated && message.message === "delete logo") {
    //     const logo = document.getElementById('hplogo');
    //     logo?.parentElement?.removeChild(logo)
    // }
}

const main = () => {
    logger.devVerbose('[content.ts] Main')
    /**
     * Fired when a message is sent from either an extension process or a content script.
     */
    chrome.runtime.onMessage.addListener(messagesFromReactAppListener);
}

// main();