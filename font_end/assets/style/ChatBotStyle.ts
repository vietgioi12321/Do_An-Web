const ChatBotStyle = {
    chatbot_window: {
        background: '#F4F6F8',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    },

    chatbot_header: {
        height: 40,
        border: '1px solid #cbd5e1',
        borderRadius: '4px',
        background: 'white',
        display: 'flex',
        alignItems: 'center',
        padding: '0 10px',
        justifyContent: 'space-between'
    },
    chatbot_messages:{
        flex: 1,
        overflowY: 'auto',
        padding: '15px',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px' 
    },
    chat_text:{
        textAlign: 'center',
        color: '#9ca3af',
        fontSize: '13px',
        marginTop: '20px'
    },
    // tin nhắn bong bóng
    msg_bubble:{
        background: 'white',
        color: '#000',
        padding: '10px 15px',
        borderRadius: '4px 12px 12px 12px',
        maxWidth: '75%',
        boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
        fontSize: '14px',
        lineHeights: 1.5
    },
    chatbot_input_area:{
        display: 'flex',
        background: 'white',
        borderTop: '1px solid #cbd5e1',
        height: '50px',
        alignItems: 'center',
        padding: '0 10px',
        flexShrink: 0
    },

    input:{
        display: 'flex',
        background: 'white',
        borderTop: '1px solid #cbd5e1',
        height: '50px',
        alignItems: 'center',
        padding: '0 10px',
        flexShrink: 0
    },

    button:{
        background: '#0ea5e9',
        color: 'white',
        border: 'none',
        width: '40px',
        height: '40px',
        borderRadius: '4px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifycontent: 'center'
    }
    
}

export default ChatBotStyle